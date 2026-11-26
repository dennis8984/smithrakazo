---
name: design-studio
description: INTERNAL ONLY — ImageMagick experiments. Do NOT use for Boss-facing banners, ads, or social graphics. Use Smith Studio instead (`studio_generate` with skillId social_ad or product_hero). Outputs under archive/ are invisible to the dashboard.
version: 1.0.1-smith.2
author: mosoonpi-ai (vendored and adapted by smith-team)
license: MIT-0
tags: design, graphics, banners, covers, imagemagick, internal
---

# Design Studio — internal experiments only

**Do not use this skill for Boss-facing media.** Ads, banners, and social
graphics go through **Smith Studio**: `studio_generate` → `studio_check_job` →
`asset.publicUrl` (CDN). Files written to `archive/` never reach the dashboard,
Workspace, or Knowledge Base.

This skill remains only for internal ImageMagick layout experiments. If the
Boss asked for a downloadable banner or ad, stop and use Studio.

Run `scripts/generate_banner_magick.sh` for internal tests only. Do not run
`generate_banner.py` or any other Pillow script: Pillow is not installed in
this container, and those scripts are not shipped.

## Banner

```bash
bash /home/node/.openclaw/skills/design-studio/scripts/generate_banner_magick.sh \
  --title "16 AI AGENTS. ONE TEAM." \
  --subtitle "Your entire marketing, sales and support team on autopilot." \
  --size 1080x1080 \
  --output /home/node/.openclaw/workspace/archive/smith-instagram-banner.png
```

Flags:

- `--title` (required), `--subtitle`
- `--size WxH` or a preset: `instagram` (1080x1080), `github`, `linkedin` (1584x396), `twitter` (1500x500), `telegram` (1280x720), `hd` (1920x1080), `web` (1920x600)
- `--bg-from`, `--bg-to`: gradient colors. Defaults `#2563eb` to `#3b82f6`
- `--accent`: rule under the title. Default `#60a5fa`
- `--text-color`: default `#ffffff`
- `--scrim`: color behind the subtitle so it stays readable on the lighter gradient stop. Default `#1e40af`. Pass `none` to turn it off
- `--font`: font family. Default tries Montserrat, Roboto, Open Sans, then DejaVu Sans
- `--output`: PNG path. Parent directories are created

Output goes under `/home/node/.openclaw/workspace/archive/`, never the workspace root.

Keep text on `#2563eb` or darker. White on `#3b82f6` is about 3.7:1, which is too low for small text. Use `#60a5fa` and `#dbeafe` only for accents, never behind text.

## Check the result

```bash
identify -format '%w %h\n' /path/to/banner.png
```

The size must match what you asked for. Then open the image and check that the title and subtitle are fully inside the frame and read clearly.

## Fonts

```bash
fc-list : family | grep -iE "montserrat|roboto|open sans|dejavu"
fc-match -f '%{family}\n' 'Montserrat:bold'
```

`fc-match` substitutes silently. If the family it prints is not the one you asked for, that font is not installed.

## References

- `references/design-rules.md`: layout, typography, and spacing rules
- `references/color-palettes.md`: 20 palettes
- `references/font-pairings.md`: 15 font pairings
- `references/knowledge-base.md`: longer design notes
- `references/svg_elements/`: icons, badges, shapes, frames. ImageMagick may refuse SVG input here, so use these only where an SVG renderer is available
