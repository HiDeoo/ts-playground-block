<div align="center">
  <h1>ts-playground-block 🔭</h1>
  <p>Embed a TypeScript Playground in GitHub</p>
</div>

<div align="center">
  <a href="https://github.com/HiDeoo/ts-playground-block/actions/workflows/integration.yml">
    <img alt="Integration Status" src="https://github.com/HiDeoo/ts-playground-block/actions/workflows/integration.yml/badge.svg" />
  </a>
  <a href="https://github.com/HiDeoo/ts-playground-block/blob/main/LICENSE">
    <img alt="License" src="https://badgen.net/github/license/HiDeoo/ts-playground-block" />
  </a>
  <br />
</div>

## Features

A [GitHub Block](https://blocks.githubnext.com) to embed a [TypeScript Playground](https://www.typescriptlang.org/play) in Markdown files or as a custom file renderer in GitHub.

- Automatic Type Acquisition
- Configurable TypeScript version saved in [metadata](https://github.com/githubnext/blocks/blob/df66e0457f1d23e883cb6d089ee1e0c80ac5c8d2/docs/Developing%20blocks/2%20Building%20your%20first%20block.md#metadata) (editable by users with write access to the repository)
- Support for [TypeScript Twoslash](https://www.typescriptlang.org/dev/twoslash) annotations
- Link to open the code in the [official TypeScript Playground](https://www.typescriptlang.org/play)

> **Note**
>
> GitHub Blocks is currently an experimental technical preview. It is not available to all GitHub users and may change at any time.

## Planned Features

GitHub Blocks is still in early development and same goes for this GitHub Block. The following features are planned:

- TS Config customization just like the official TypeScript Playground.
- Dark mode (the GitHub Blocks UI does not yet support a dark mode).

## Limitations

It is currently not possible to customize the options, e.g. the TypeScript version, of the TypeScript Playground GitHub Block directly from Markdown but some sort of "instance" state allowing this kind of customization is on the roadmap.

## Examples

> **Note**
>
> The examples below require a GitHub account with access to the GitHub Blocks technical preview. Some screenshots are provided as an alternative.

- [Embedded in a README file.](https://blocks.githubnext.com/HiDeoo/ts-playground-block/blob/main/examples/README.md)
- [As a file renderer for a TypeScript file.](https://blocks.githubnext.com/HiDeoo/ts-playground-block/blob/main/examples/basic.ts)
- [As a file renderer for a TypeScript file with a specific TypeScript version.](https://blocks.githubnext.com/HiDeoo/ts-playground-block/blob/main/examples/version.ts)

![Embedded in a README file.](https://user-images.githubusercontent.com/494699/219106150-2e27a48c-3012-47bb-8260-64918aec6af2.png)

![As a file renderer for a TypeScript file.](https://user-images.githubusercontent.com/494699/219106513-c7d3c4e4-34e3-496d-9a30-3931c48413ac.png)

![As a file renderer for a TypeScript file with a specific TypeScript version.](https://user-images.githubusercontent.com/494699/219106566-7d9682d7-3682-4d56-baf1-6341b8fdb6d6.png)

## License

Licensed under the MIT License, Copyright © HiDeoo.

See [LICENSE](https://github.com/HiDeoo/ts-playground-block/blob/main/LICENSE) for more information.
