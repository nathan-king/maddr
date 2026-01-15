# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] – 2026-01-15

### Added

- Initial release
- Structured markdown (`.mdr`) parser with section (`$[section]`) and field (`@field`) syntax
- `parseMarkdown` for extracting markdown content
- `parseHtml` for rendering fields to HTML
- `parseRaw` for extracting plain text
- Default export exposing `parse` as an alias for `parseRaw`
