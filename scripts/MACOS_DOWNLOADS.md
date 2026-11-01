---
kind: howto
---

### macOS beta packages

On Apple Silicon, download the disk image whose name contains `macos-arm64.dmg`; on Intel, the one containing `macos-x86_64.dmg`. Check your chip or processor in About This Mac. Open the image, drag Peach into Applications, then open the app to finish first-run setup. If macOS says the app "is damaged and can't be opened", run `sudo /usr/bin/xattr -rd com.apple.quarantine "/Applications/Peach.app"` in Terminal and open it again. When asked for a password, enter this Mac's login password; the screen shows no characters while you type. The command only removes Peach's quarantine flag; run it again after installing a new version.

The app bundles Python and runs on its own; single-machine use does not need Windows. The beta packages are ad-hoc signed and not yet signed with a Developer ID or notarized by Apple. Media tools must be installed separately, and macOS has no in-app update installer; Check for updates on the settings page offers the new DMG for this Mac's architecture. The minimum macOS version is the package's `LSMinimumSystemVersion`.

For installation, mounting sources and two-machine replication, see the [macOS guide](https://github.com/tam003/peach/blob/master/docs/OPERATIONS.md#macos-独立测试包). Each architecture is built natively, and both disk images are uploaded to the same release; their hashes are in `SHA256SUMS.txt`.
