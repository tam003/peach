---
kind: howto
---

### macOS beta packages

On Apple Silicon, download the disk image whose name contains `macos-arm64.dmg`; on Intel, the one containing `macos-x86_64.dmg`. Check your chip or processor in About This Mac. Open the image, drag Peach into Applications, then open the app to finish first-run setup.

The app bundles Python and runs on its own; single-machine use does not need Windows. The beta packages are ad-hoc signed and not yet signed with a Developer ID or notarized by Apple. Media tools must be installed separately, and macOS has no in-app update installer yet. The minimum macOS version is the package's `LSMinimumSystemVersion`.

For installation, mounting sources and two-machine replication, see the [macOS guide](https://github.com/tam003/peach/blob/master/docs/OPERATIONS.md#macos-独立测试包). Each architecture is built natively, and both disk images are uploaded to the same release; their hashes are in `SHA256SUMS.txt`.
