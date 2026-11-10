"""Fetch licensed, self-hosted display subsets for the first-screen studies."""

import hashlib
import json
from pathlib import Path
import re
from urllib.parse import urlencode, urlsplit
from urllib.request import Request, urlopen


def fetch(url):
    """Fetch a public font resource over TLS.

    Args:
        url: Public Google Fonts or Google fonts repository URL.

    Returns:
        Resource bytes returned by the source.
    """
    request = Request(url, headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"})
    with urlopen(request, timeout=45) as response:
        return response.read()


def main():
    """Download small display subsets and their original OFL notices."""
    root = Path(__file__).resolve().parents[1]
    output = root / "public/fonts/art-directions"
    output.mkdir(parents=True, exist_ok=True)
    records = []
    for family, text, slug in [
        ("Black Han Sans", "김강남", "black-han-name"),
        ("Bricolage Grotesque:opsz,wght@12..96,400..800", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz .&", "bricolage-latin"),
    ]:
        api = "https://fonts.googleapis.com/css2?" + urlencode({"family": family, "text": text, "display": "swap"})
        css = fetch(api).decode()
        urls = re.findall(r"url\((https://[^)]+)\)", css)
        assert urls, css
        source = urls[0]
        assert urlsplit(source).hostname == "fonts.gstatic.com", source
        payload = fetch(source)
        assert payload[:4] == b"wOF2", "Expected a real WOFF2 font"
        target = output / f"{slug}.woff2"
        target.write_bytes(payload)
        upstream_family = "blackhansans" if slug == "black-han-name" else "bricolagegrotesque"
        license_url = f"https://raw.githubusercontent.com/google/fonts/main/ofl/{upstream_family}/OFL.txt"
        license_bytes = fetch(license_url)
        assert b"SIL OPEN FONT LICENSE" in license_bytes
        license_text = "\n".join(line.rstrip() for line in license_bytes.decode().splitlines()) + "\n"
        (output / f"{slug}-OFL.txt").write_text(license_text)
        records.append({"family": family, "text_subset": text, "css_source": api, "woff2_source": source, "local_file": target.relative_to(root).as_posix(), "bytes": len(payload), "sha256": hashlib.sha256(payload).hexdigest(), "license_source": license_url, "runtime_external_requests": False})
    (root / "docs/portfolio/direction-studies/fonts.json").write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(records, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
