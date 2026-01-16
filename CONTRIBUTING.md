# Contributing to maddr

Thanks for your interest in contributing to maddr.
This project is still early-stage, and feedback is especially valuable right now.

You do not need to be an expert to contribute. Testing, syntax feedback, and small suggestions are all very welcome.

## Ways to Contribute
### Test the .mdr Syntax

The most helpful contribution right now is simply trying the modified markdown syntax and reporting what you notice.

Things to look for:
-	Anything that feels awkward or unintuitive
-	Parsing bugs or unexpected output
- Ambiguous or unclear rules
- Edge cases with whitespace or indentation

You can experiment freely. There is no “wrong” input.

### Run the Demo Locally

Clone the repository and install dependencies:

`pnpm install`

Run the demo script with different output modes:

`pnpm demo raw`
`pnpm demo html`
`pnpm demo md`

The demo uses demo.mdr.
You are encouraged to modify this file or create your own test content.

### Report Issues or Feedback

If you find something odd or confusing:
- Open a new issue, or
- Comment on an existing issue

Please include:
- The .mdr snippet you used
- The output you got
- What you expected to happen instead

Screenshots or pasted output are perfectly fine.

## Focus Areas

If you are not sure where to start, these areas are especially useful to test:
- Section nesting using `$[parent:child]` / `$[:child]`
- Field repetition and array behaviour
- List handling (unordered and ordered)
- Mixing lists with fields
- Whitespace and indentation edge cases

## Code Contributions

Code contributions are welcome, but not required.

If you would like to submit code:
- Keep changes small and focused
- Prefer clarity over cleverness
- Open an issue first if the change is significant

There are no strict style rules yet.

## Philosophy

The goal of maddr is to:
- Keep markdown readable for humans
- Enable structured content without a heavy DSL
- Stay simple and predictable

If something feels too complex, that is probably a smell worth reporting.
