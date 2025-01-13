const formatMessage = require("format-message");
const languageNames = require("scratch-translate-extension-languages");

const ArgumentType = require("../../extension-support/argument-type");
const BlockType = require("../../extension-support/block-type");
const Cast = require("../../util/cast");
const MathUtil = require("../../util/math-util");
const Clone = require("../../util/clone");
const log = require("../../util/log");
const { fetchWithTimeout } = require('../../util/fetch-with-timeout');
const Scratch3Mv2Blocks = require("marty-blocks-lib/src/Scratch3Mv2Blocks");
const PitchShifter = require("soundtouchjs").PitchShifter;

/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjIgKDY3MTQ1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5FeHRlbnNpb25zL1NvZnR3YXJlL1RleHQtdG8tU3BlZWNoLU1lbnU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iRXh0ZW5zaW9ucy9Tb2Z0d2FyZS9UZXh0LXRvLVNwZWVjaC1NZW51IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0idGV4dDJzcGVlY2giIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuMDAwMDAwLCAyLjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik01Ljc1LDguODM0NjcxNzMgQzUuNzUsOC4zMjY5NjM0NCA1LjAwMzAwNzI3LDguMDQyMjEzNzEgNC41NTYyODAxMiw4LjQ0NDE0OTk5IEwzLjIwNjI4MDEyLDkuNTI1MzU3MDIgQzIuNjk2NzMzNzgsOS45MzM0NDk2OCAyLjAzNzQ4Njc1LDEwLjE2NTg3ODggMS4zNSwxMC4xNjU4Nzg4IEwxLjE1LDEwLjE2NTg3ODggQzAuNjMyNTk2MTY1LDEwLjE2NTg3ODggMC4yNSwxMC41MTA2MDAyIDAuMjUsMTAuOTUyMDM1NSBMMC4yNSwxMy4wNjkzOTkzIEMwLjI1LDEzLjUxMDgzNDYgMC42MzI1OTYxNjUsMTMuODU1NTU2IDEuMTUsMTMuODU1NTU2IEwxLjM1LDEzLjg1NTU1NiBDMi4wNzg3Nzg0MSwxMy44NTU1NTYgMi43MjY4NjE2MSwxNC4wNjY3NjM2IDMuMjU5ODYwNDksMTQuNDk5IEw0LjU1OTIwMTQ3LDE1LjU3OTY2MDggQzUuMDEzMDkyNzYsMTUuOTU0NTM5NiA1Ljc1LDE1LjY3MzYzNDQgNS43NSwxNS4xNDE3MTI4IEw1Ljc1LDguODM0NjcxNzMgWiIgaWQ9InNwZWFrZXIiIHN0cm9rZS1vcGFjaXR5PSIwLjE1IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSIjNEQ0RDREIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMC43MDQ4MzEzLDggQzkuNzkwNjc0NjgsOS4xMzExNDg0NyA4LjMwNjYxODQsOS43MTQyODU3MSA3LjgzMzMzMzMzLDkuNzE0Mjg1NzEgQzcuODMzMzMzMzMsOS43MTQyODU3MSA3LjUsOS43MTQyODU3MSA3LjUsOS4zODA5NTIzOCBDNy41LDkuMDg1MjI2ODQgOC4wNjIyMDE2OCw4LjkwMTk0MTY0IDguMTg5MDYwNjcsNy41Njc1NDA1OCBDNi44ODk5Njk5MSw2LjkwNjc5MDA1IDYsNS41NTczMjY4MyA2LDQgQzYsMS43OTA4NjEgNy43OTA4NjEsNC4wNTgxMjI1MWUtMTYgMTAsMCBMMTIsMCBDMTQuMjA5MTM5LC00LjA1ODEyMjUxZS0xNiAxNiwxLjc5MDg2MSAxNiw0IEMxNiw2LjIwOTEzOSAxNC4yMDkxMzksOCAxMiw4IEwxMC43MDQ4MzEzLDggWiIgaWQ9InNwZWVjaCIgZmlsbD0iIzBFQkQ4QyI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjIgKDY3MTQ1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5FeHRlbnNpb25zL1NvZnR3YXJlL1RleHQtdG8tU3BlZWNoLUJsb2NrPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkV4dGVuc2lvbnMvU29mdHdhcmUvVGV4dC10by1TcGVlY2gtQmxvY2siIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1vcGFjaXR5PSIwLjE1Ij4KICAgICAgICA8ZyBpZD0idGV4dDJzcGVlY2giIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDAwMDAwLCA0LjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjMDAwMDAwIj4KICAgICAgICAgICAgPHBhdGggZD0iTTExLjUsMTcuNjY5MzQzNSBDMTEuNSwxNi42NTM5MjY5IDEwLjAwNjAxNDUsMTYuMDg0NDI3NCA5LjExMjU2MDI0LDE2Ljg4ODMgTDYuNDEyNTYwMjQsMTkuMDUwNzE0IEM1LjM5MzQ2NzU1LDE5Ljg2Njg5OTQgNC4wNzQ5NzM1MSwyMC4zMzE3NTc1IDIuNywyMC4zMzE3NTc1IEwyLjMsMjAuMzMxNzU3NSBDMS4yNjUxOTIzMywyMC4zMzE3NTc1IDAuNSwyMS4wMjEyMDAzIDAuNSwyMS45MDQwNzEgTDAuNSwyNi4xMzg3OTg2IEMwLjUsMjcuMDIxNjY5MyAxLjI2NTE5MjMzLDI3LjcxMTExMiAyLjMsMjcuNzExMTEyIEwyLjcsMjcuNzExMTEyIEM0LjE1NzU1NjgyLDI3LjcxMTExMiA1LjQ1MzcyMzIyLDI4LjEzMzUyNzEgNi41MTk3MjA5OCwyOC45OTggTDkuMTE4NDAyOTMsMzEuMTU5MzIxNiBDMTAuMDI2MTg1NSwzMS45MDkwNzkzIDExLjUsMzEuMzQ3MjY4OSAxMS41LDMwLjI4MzQyNTUgTDExLjUsMTcuNjY5MzQzNSBaIiBpZD0ic3BlYWtlciIgZmlsbD0iIzRENEQ0RCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMjEuNjQzNjA2NiwxNi41IEMxOS45NzcwMDk5LDE4LjQzNzAyMzQgMTcuMTA1MDI3NSwxOS45Mjg1NzE0IDE1LjY2NjY2NjcsMTkuOTI4NTcxNCBDMTUuNTEyNjM5NywxOS45Mjg1NzE0IDE1LjMxNjYyOTIsMTkuODk1OTAzIDE1LjEwOTcyNjUsMTkuNzkyNDUxNyBDMTQuNzM3NjAzOSwxOS42MDYzOTA0IDE0LjUsMTkuMjQ5OTg0NiAxNC41LDE4Ljc2MTkwNDggQzE0LjUsMTguNjU2ODA0MSAxNC41MTcwNTU1LDE4LjU1NDUwNzYgMTQuNTQ5NDQ2NywxOC40NTQwODQ0IEMxNC42MjU3NTQ1LDE4LjIxNzUwNjMgMTUuMTczNTcyMSwxNy40Njc1MzEgMTUuMjc3MjA3MSwxNy4yODA5ODgxIEMxNS41NDYzNTI2LDE2Ljc5NjUyNjEgMTUuNzM5MDI1LDE2LjIwNjM1NjEgMTUuODQzMjg5MSwxNS40MTYwMDM0IEMxMy4xODk3MDA1LDEzLjkyNjgzNjkgMTEuNSwxMS4xMTM5NjY4IDExLjUsOCBDMTEuNSwzLjMwNTU3OTYzIDE1LjMwNTU3OTYsLTAuNSAyMCwtMC41IEwyNCwtMC41IEMyOC42OTQ0MjA0LC0wLjUgMzIuNSwzLjMwNTU3OTYzIDMyLjUsOCBDMzIuNSwxMi42OTQ0MjA0IDI4LjY5NDQyMDQsMTYuNSAyNCwxNi41IEwyMS42NDM2MDY2LDE2LjUgWiIgaWQ9InNwZWVjaCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";

// eslint-disable-next-line max-len
const martyBlockIconURI =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgaWQ9IkxheWVyXzEiCiAgIHZpZXdCb3g9Ii01IDAgNzUgNTAiCiAgIGhlaWdodD0iNDQiCiAgIHdpZHRoPSI0MCIKICAgdmVyc2lvbj0iMS4xIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMxNiIgLz4KICA8cGF0aAogICAgIGQ9Im0gNzEuMzMyODgxLDI0LjMxOTE1MiBjIDAuMDUsLTAuOTMgLTAuMjYsLTEuODIgLTAuODksLTIuNTEgLTAuNDQsLTAuNDggLTAuOTksLTAuODIgLTEuNTgsLTEgbCAwLjA4LC0xLjEgdiAtMC4xNiBjIDAsLTMuNjIgLTIuOCwtNi42MyAtNi4zOCwtNi45IGwgMi45OCwtNS4xNjk5OTk2IC01LjE2LC0wLjg5IC0xOC4xMiwtMy4yIC0xLjA5LDYuMjcgOC4xLDEuNDI5OTk5NiBjIC0xLjA0LDAuMDggLTIuMDcsMC4yNyAtMy4wOCwwLjU2IC0xLjQzLC0wLjA3IC0yLjY4LC0wLjEzIC0zLjYxLC0wLjE2IC0xLjE5LC0wLjAzIC0zLjAxLC0wLjA1IC00Ljk4LC0wLjA1IC0xLjk3LDAgLTMuNzksMC4wMiAtNC45OSwwLjA1IC0wLjkzLDAuMDMgLTIuMjEsMC4wOSAtMy42OSwwLjE2IC0xLjAxLC0wLjI5IC0yLjA0LC0wLjQ4IC0zLjA4LC0wLjU2IGwgOC4wOSwtMS40Mjk5OTk2IC0xLjA5LC02LjI3IC0xOC4xMSwzLjIgLTUuMTYsMC44OSAyLjk2LDUuMTY5OTk5NiBjIC0zLjU5LDAuMjkgLTYuMzgsMy4yOSAtNi4zOCw2LjkgdiAwLjA2IGwgMC4wNiwxLjEyIGMgLTEuNjQsMC4zNSAtMi44NSwxLjg0IC0yLjc1LDMuNTggbCAwLjczLDEyLjY2IGMgMC4wNCwwLjU1IDAuMjIsMS4wNiAwLjQ4LDEuNTEgLTAuMTIsMC4zOSAtMC4xOCwwLjc5IC0wLjE2LDEuMjEgbCAwLjYsMTAuMzMgYyAwLjEsMS44NCAxLjYyLDMuMjkgMy40NywzLjI5IGggMC4yMiBjIDAuMjIsLTAuMDIgMC40MywtMC4wNiAwLjYzLC0wLjExIDEuMjIsMS40MiAzLjAyLDIuMzIgNS4wMiwyLjMyIGggNDUuNzkgYyAyLDAgMy44MiwtMC45MSA1LjA0LC0yLjM1IDAuMjQsMC4wNyAwLjQ5LDAuMTIgMC43NSwwLjE0IGggMC4xOSBjIDEuODQsMCAzLjM3LC0xLjQ0IDMuNDcsLTMuMjcgbCAwLjYsLTEwLjM0IGMgMC4wMiwtMC40MSAtMC4wNCwtMC44MiAtMC4xNiwtMS4yMSAwLjI3LC0wLjQ2IDAuNDQsLTAuOTcgMC40OCwtMS41NCBsIDAuNzQsLTEyLjY0IHoiCiAgICAgc3R5bGU9ImZpbGw6IzJjOGI5YiIKICAgICBpZD0icGF0aDEiIC8+CiAgPHBhdGgKICAgICBkPSJtIDYwLjIzMjg4MSw1My4zMzkxNTIgaCAtNDUuNzkgYyAtMi4zNCwwIC00LjI3LC0xLjgyIC00LjQsLTQuMTYgbCAtMS43LC0yOS42MSBjIDAsLTIuNTEgMS45NSwtNC41OCA0LjQ2LC00LjcyIDAsMCAxNC44OSwtMSAxOS44NywtMS4xNCAyLjQ2LC0wLjA3IDcuMzksLTAuMDcgOS44NSwwIDQuOTUsMC4xNCAxOS43OSwxLjE0IDE5Ljc5LDEuMTQgMi41LDAuMTQgNC40NSwyLjIxIDQuNDUsNC43MSBsIC0yLjEyLDI5LjY5IGMgLTAuMTYsMi4zMSAtMi4wOSw0LjEgLTQuNCw0LjEgeiIKICAgICBzdHlsZT0iZmlsbDojNWVjYmY1IgogICAgIGlkPSJwYXRoMiIgLz4KICA8cGF0aAogICAgIGQ9Im0gNjAuMjMyODgxLDUzLjgzOTE1MiBoIC00NS43OSBjIC0yLjYsMCAtNC43NSwtMi4wMyAtNC45LC00LjYzIGwgLTEuNywtMjkuNjEgYyAwLC0yLjggMi4xNiwtNS4wOSA0LjkzLC01LjI1IDAuMTQsMCAxNC45NiwtMSAxOS44OCwtMS4xNCAyLjQ5LC0wLjA3IDcuMzksLTAuMDcgOS44OCwwIDQuOTEsMC4xNCAxOS42NiwxLjEzIDE5LjgxLDEuMTQgMi43NSwwLjE2IDQuOTIsMi40NSA0LjkyLDUuMjEgbCAtMi4xMiwyOS43MiBjIC0wLjE4LDIuNTYgLTIuMzMsNC41NiAtNC45LDQuNTYgeiBtIC0yMi42NywtMzkuNjkgYyAtMS44NCwwIC0zLjY3LDAuMDIgLTQuODgsMC4wNSAtNC45MSwwLjE0IC0xOS43LDEuMTMgLTE5Ljg1LDEuMTQgLTIuMjQsMC4xMyAtMy45OSwxLjk4IC0zLjk5LDQuMjIgbCAxLjcsMjkuNTggYyAwLjEyLDIuMDcgMS44MywzLjY5IDMuOTEsMy42OSBoIDQ1Ljc5IGMgMi4wNCwwIDMuNzYsLTEuNiAzLjksLTMuNjMgbCAyLjEyLC0yOS42OSBjIDAsLTIuMiAtMS43NSwtNC4wNSAtMy45OSwtNC4xOCAtMC4xNSwtMC4wMSAtMTQuODgsLTEgLTE5Ljc3LC0xLjE0IC0xLjIyLC0wLjA0IC0zLjA4LC0wLjA1IC00Ljk0LC0wLjA1IHoiCiAgICAgc3R5bGU9ImZpbGw6IzM1MzQyYyIKICAgICBpZD0icGF0aDMiIC8+CiAgPHBhdGgKICAgICBpZD0icGF0aDExNzYtNSIKICAgICBkPSJtIDM3LjIyMjg4MSwzOS4wNzkxNTIgMy43MSwyLjE0IHYgNC4wNiBsIC0zLjY2LDIuMTEgLTMuNiwtMi4wOCB2IC00LjIzIHoiCiAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZiIgLz4KICA8cGF0aAogICAgIGQ9Im0gMzcuMjcyODgxLDQ3Ljk2OTE1MiAtNC4xLC0yLjM3IHYgLTQuODIgbCA0LjA2LC0yLjI4IDQuMiwyLjQyIHYgNC42MyBsIC00LjE2LDIuNCB6IG0gLTMuMSwtMi45NSAzLjEsMS43OSAzLjE2LC0xLjgyIHYgLTMuNDggbCAtMy4yMSwtMS44NSAtMy4wNSwxLjcxIHoiCiAgICAgc3R5bGU9ImZpbGw6IzM1MzQyYyIKICAgICBpZD0icGF0aDQiIC8+CiAgPHBhdGgKICAgICBkPSJtIDI0LjY5Mjg4MSwxMy4yNTkxNTIgYyAtMi4yMSwwIC00LjI5LDAuNTYgLTYuMTEsMS41NCBsIC0zLjQ5LC02LjAzOTk5OTYgLTIuMDgsMC4zNyAzLjksNi43NTk5OTk2IGMgLTMuMDgsMi4zNSAtNS4wOCw2LjA1IC01LjA4LDEwLjIyIDAsNy4xIDUuNzUsMTIuODUgMTIuODUsMTIuODUgNy4xLDAgMTIuODUsLTUuNzUgMTIuODUsLTEyLjg1IDAsLTcuMSAtNS43NSwtMTIuODUgLTEyLjg1LC0xMi44NSB6IgogICAgIHN0eWxlPSJmaWxsOiNmZmZmZmYiCiAgICAgaWQ9InBhdGg1IiAvPgogIDxwYXRoCiAgICAgZD0ibSAyNC42OTI4ODEsMzkuNDU5MTUyIGMgLTcuMzYsMCAtMTMuMzUsLTUuOTkgLTEzLjM1LC0xMy4zNSAwLC00LjA1IDEuNzksLTcuNzkgNC45MywtMTAuMzQgbCAtNC4wNCwtNy4wMDk5OTk2IDMuMTIsLTAuNTUgMy40Miw1LjkyOTk5OTYgYyAxLjgzLC0wLjkgMy44NywtMS4zOCA1LjkyLC0xLjM4IDcuMzYsMCAxMy4zNSw1Ljk5IDEzLjM1LDEzLjM1IDAsNy4zNiAtNS45OSwxMy4zNSAtMTMuMzUsMTMuMzUgeiBtIC0xMC44OSwtMjkuOTU5OTk5NiAzLjc3LDYuNTI5OTk5NiAtMC4zNSwwLjI3IGMgLTMuMSwyLjM2IC00Ljg4LDUuOTQgLTQuODgsOS44MiAwLDYuODEgNS41NCwxMi4zNSAxMi4zNSwxMi4zNSA2LjgxLDAgMTIuMzUsLTUuNTQgMTIuMzUsLTEyLjM1IDAsLTYuODEgLTUuNTQsLTEyLjM1IC0xMi4zNSwtMTIuMzUgLTIuMDUsMCAtNC4wOCwwLjUxIC01Ljg3LDEuNDggbCAtMC40MywwLjIzIC0zLjU2LC02LjE1OTk5OTYgeiIKICAgICBzdHlsZT0iZmlsbDojMzUzNDJjIgogICAgIGlkPSJwYXRoNiIgLz4KICA8cG9seWdvbgogICAgIHBvaW50cz0iMTkuMiwyNCAxOC4xNCwyMi4xOCAzNi4xNywxOSAzNi41MSwyMC45NSAiCiAgICAgaWQ9InBvbHlnb242IgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01LjEyNzExODYsLTEzLjA1MDg0OCkiIC8+CiAgPHBhdGgKICAgICBkPSJtIDEzLjgxMjg4MSwxMS41MDkxNTIgLTEuNTksLTIuNzQ5OTk5NiAxOS4yMiwtMy4zOSAwLjUyLDIuOTQgeiBtIC0wLjAxLC0yLjAwOTk5OTYgMC41MiwwLjg5OTk5OTYgMTYuNDgsLTIuOTA5OTk5NiAtMC4xNywtMC45NyAtMTYuODMsMi45NyB6IgogICAgIGlkPSJwYXRoNyIgLz4KICA8cGF0aAogICAgIGQ9Im0gNTAuMzkyODgxLDEzLjI1OTE1MiBjIDIuMjEsMCA0LjI5LDAuNTYgNi4xMSwxLjU0IGwgMy40OSwtNi4wMzk5OTk2IDIuMDgsMC4zNyAtMy45LDYuNzU5OTk5NiBjIDMuMDgsMi4zNSA1LjA4LDYuMDUgNS4wOCwxMC4yMiAwLDcuMSAtNS43NSwxMi44NSAtMTIuODUsMTIuODUgLTcuMSwwIC0xMi44NSwtNS43NSAtMTIuODUsLTEyLjg1IDAsLTcuMSA1Ljc1LC0xMi44NSAxMi44NSwtMTIuODUgeiIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmIgogICAgIGlkPSJwYXRoOCIgLz4KICA8cGF0aAogICAgIGQ9Im0gNTAuMzkyODgxLDM5LjQ1OTE1MiBjIC03LjM2LDAgLTEzLjM1LC01Ljk5IC0xMy4zNSwtMTMuMzUgMCwtNy4zNiA1Ljk5LC0xMy4zNSAxMy4zNSwtMTMuMzUgMi4wNSwwIDQuMDksMC40OCA1LjkyLDEuMzggbCAzLjQyLC01LjkyOTk5OTYgMy4xMiwwLjU1IC00LjA0LDcuMDA5OTk5NiBjIDMuMTQsMi41NSA0LjkzLDYuMyA0LjkzLDEwLjM0IDAsNy4zNiAtNS45OSwxMy4zNSAtMTMuMzUsMTMuMzUgeiBtIDAsLTI1LjcgYyAtNi44MSwwIC0xMi4zNSw1LjU0IC0xMi4zNSwxMi4zNSAwLDYuODEgNS41NCwxMi4zNSAxMi4zNSwxMi4zNSA2LjgxLDAgMTIuMzUsLTUuNTQgMTIuMzUsLTEyLjM1IDAsLTMuODggLTEuNzgsLTcuNDYgLTQuODgsLTkuODIgbCAtMC4zNSwtMC4yNyAzLjc3LC02LjUyOTk5OTYgLTEuMDMsLTAuMTggLTMuNTYsNi4xNTk5OTk2IC0wLjQzLC0wLjIzIGMgLTEuNzksLTAuOTcgLTMuODIsLTEuNDggLTUuODcsLTEuNDggeiIKICAgICBzdHlsZT0iZmlsbDojMzUzNDJjIgogICAgIGlkPSJwYXRoOSIgLz4KICA8cG9seWdvbgogICAgIHBvaW50cz0iNjYuMTQsMjQgNjcuMTksMjIuMTggNDkuMTcsMTkgNDguODMsMjAuOTUgIgogICAgIGlkPSJwb2x5Z29uOSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNS4xMjcxMTg2LC0xMy4wNTA4NDgpIiAvPgogIDxwYXRoCiAgICAgZD0ibSA2MS4yNzI4ODEsMTEuNTA5MTUyIC0xOC4xNSwtMy4xOTk5OTk2IDAuNTIsLTIuOTQgMTkuMjIsMy4zOSB6IG0gLTE2Ljk5LC00LjAxOTk5OTYgMTYuNDgsMi45MDk5OTk2IDAuNTIsLTAuODk5OTk5NiAtMTYuODMsLTIuOTcgLTAuMTcsMC45NyB6IgogICAgIGlkPSJwYXRoMTAiIC8+CiAgPGcKICAgICBpZD0iZzExNzQiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUuMTI3MTE4NiwtMTMuMDUwODQ4KSI+CiAgICA8cGF0aAogICAgICAgaWQ9InBhdGgxMDQ2LTctNi02IgogICAgICAgZD0ibSAzMi43MiwzOS40OCBjIDAsMS42IC0xLjMsMi45IC0yLjksMi45IC0xLjYsMCAtMi45LC0xLjMgLTIuOSwtMi45IHYgMCBjIDAsLTEuNiAxLjMsLTIuOSAyLjksLTIuOSB2IDAgYyAxLjYsMCAyLjksMS4zIDIuOSwyLjkgeiIKICAgICAgIHN0eWxlPSJmaWxsOiMwMTAxMDEiIC8+CiAgICA8cGF0aAogICAgICAgZD0ibSAyOS44Miw0Mi40IGMgLTEuNjEsMCAtMi45MiwtMS4zMSAtMi45MiwtMi45MiAwLC0xLjYxIDEuMzEsLTIuOTIgMi45MiwtMi45MiAxLjYxLDAgMi45MiwxLjMxIDIuOTIsMi45MiAwLDEuNjEgLTEuMzEsMi45MiAtMi45MiwyLjkyIHogbSAwLC01LjggYyAtMS41OSwwIC0yLjg4LDEuMjkgLTIuODgsMi44OCAwLDEuNTkgMS4yOSwyLjg4IDIuODgsMi44OCAxLjU5LDAgMi44OCwtMS4yOSAyLjg4LC0yLjg4IDAsLTEuNTkgLTEuMjksLTIuODggLTIuODgsLTIuODggeiIKICAgICAgIHN0eWxlPSJmaWxsOiMzNTM0MmMiCiAgICAgICBpZD0icGF0aDExIiAvPgogIDwvZz4KICA8cGF0aAogICAgIGlkPSJwYXRoMTA0Ni03LTUiCiAgICAgZD0ibSA1My4zNDI4ODEsMjYuOTE5MTUyIGMgLTAuMjcsMS41OCAtMS43NywyLjY0IC0zLjM1LDIuMzcgLTEuNTgsLTAuMjcgLTIuNjQsLTEuNzcgLTIuMzcsLTMuMzUgMC4yNywtMS41OCAxLjc3LC0yLjY0IDMuMzUsLTIuMzcgdiAwIGMgMS41OCwwLjI3IDIuNjQsMS43NyAyLjM3LDMuMzUgeiIKICAgICBzdHlsZT0iZmlsbDojMDEwMTAxIiAvPgogIDxwYXRoCiAgICAgZD0ibSA1MC40OTI4ODEsMjkuMzQ5MTUyIGMgLTAuMTcsMCAtMC4zMywtMC4wMSAtMC41LC0wLjA0IC0xLjU5LC0wLjI3IC0yLjY2LC0xLjc4IC0yLjM5LC0zLjM3IDAuMTMsLTAuNzcgMC41NSwtMS40NCAxLjE5LC0xLjg5IDAuNjQsLTAuNDUgMS40MSwtMC42MyAyLjE4LC0wLjUgMC43NywwLjEzIDEuNDQsMC41NSAxLjg5LDEuMTkgMC40NSwwLjY0IDAuNjMsMS40MSAwLjUsMi4xOCAtMC4xMywwLjc3IC0wLjU1LDEuNDQgLTEuMTksMS44OSAtMC41LDAuMzUgLTEuMDgsMC41NCAtMS42OCwwLjU0IHogbSAtMC4wMSwtNS44IGMgLTAuNTksMCAtMS4xNywwLjE4IC0xLjY2LDAuNTMgLTAuNjMsMC40NCAtMS4wNSwxLjExIC0xLjE3LDEuODcgLTAuMTMsMC43NiAwLjA0LDEuNTIgMC40OSwyLjE1IDAuNDUsMC42MyAxLjExLDEuMDUgMS44NywxLjE3IDAuNzYsMC4xMyAxLjUyLC0wLjA0IDIuMTUsLTAuNDkgMC42MywtMC40NCAxLjA1LC0xLjExIDEuMTcsLTEuODcgMC4xMywtMC43NiAtMC4wNCwtMS41MiAtMC40OSwtMi4xNSAtMC40NSwtMC42MyAtMS4xMSwtMS4wNCAtMS44NywtMS4xNyAtMC4xNiwtMC4wMyAtMC4zMywtMC4wNCAtMC40OSwtMC4wNCB6IgogICAgIHN0eWxlPSJmaWxsOiMzNTM0MmMiCiAgICAgaWQ9InBhdGgxMiIgLz4KICA8cmVjdAogICAgIHg9IjQuMjQ5NjQwNSIKICAgICB5PSIyMy4yMDI4MDYiCiAgICAgd2lkdGg9IjIuNTUiCiAgICAgaGVpZ2h0PSIxNS4yMSIKICAgICByeD0iMS4yOCIKICAgICByeT0iMS4yOCIKICAgICB0cmFuc2Zvcm09InJvdGF0ZSgtMy4yOSkiCiAgICAgc3R5bGU9ImZpbGw6I2ZmZDUyYSIKICAgICBpZD0icmVjdDEyIiAvPgogIDxwYXRoCiAgICAgZD0ibSA3LjY1Mjg4MSwzOC41MzkxNTIgYyAtMC45MywwIC0xLjcyLC0wLjczIC0xLjc3LC0xLjY4IGwgLTAuNzMsLTEyLjYzIGMgLTAuMDMsLTAuNDcgMC4xMywtMC45MyAwLjQ1LC0xLjI4IDAuMzIsLTAuMzUgMC43NSwtMC41NiAxLjIyLC0wLjU5IDAuNDcsLTAuMDMgMC45MywwLjEzIDEuMjgsMC40NSAwLjM1LDAuMzIgMC41NiwwLjc1IDAuNTksMS4yMiBsIDAuNzMsMTIuNjMgYyAwLjA2LDAuOTggLTAuNjksMS44MiAtMS42NywxLjg4IHYgMCBjIDAsMCAtMC4wNywwIC0wLjEsMCB6IG0gLTAuNzMsLTE1LjE5IGMgMCwwIC0wLjAzLDAgLTAuMDUsMCAtMC4yMSwwLjAxIC0wLjQsMC4xIC0wLjU0LDAuMjYgLTAuMTQsMC4xNiAtMC4yMSwwLjM1IC0wLjIsMC41NiBsIDAuNzMsMTIuNjMgYyAwLjAyLDAuNDMgMC4zOSwwLjc3IDAuODIsMC43MyAwLjQzLC0wLjAzIDAuNzYsLTAuMzkgMC43MywtMC44MiBsIC0wLjczLC0xMi42MyBjIC0wLjAxLC0wLjIxIC0wLjEsLTAuNCAtMC4yNiwtMC41NCAtMC4xNCwtMC4xMyAtMC4zMywtMC4yIC0wLjUyLC0wLjIgeiIKICAgICBzdHlsZT0iZmlsbDojMzUzNDJjIgogICAgIGlkPSJwYXRoMTMiIC8+CiAgPHJlY3QKICAgICB4PSI0LjQxNTgwOTYiCiAgICAgeT0iMzguNjM2MTczIgogICAgIHdpZHRoPSIyLjU1IgogICAgIGhlaWdodD0iMTIuOTEiCiAgICAgcng9IjEuMjgiCiAgICAgcnk9IjEuMjgiCiAgICAgdHJhbnNmb3JtPSJyb3RhdGUoLTMuMjkpIgogICAgIHN0eWxlPSJmaWxsOiNmZmQ1MmEiCiAgICAgaWQ9InJlY3QxMyIgLz4KICA8cGF0aAogICAgIGQ9Im0gOC41NzI4ODEsNTEuNjI5MTUyIGMgLTAuOTMsMCAtMS43MiwtMC43MyAtMS43NywtMS42OCBsIC0wLjU5LC0xMC4zNCBjIC0wLjA2LC0wLjk4IDAuNjksLTEuODIgMS42NywtMS44OCAwLjk3LC0wLjA1IDEuODIsMC42OSAxLjg4LDEuNjcgbCAwLjU5LDEwLjM0IGMgMC4wNiwwLjk4IC0wLjY5LDEuODIgLTEuNjcsMS44OCB2IDAgYyAwLDAgLTAuMDcsMCAtMC4xLDAgeiBtIC0wLjYsLTEyLjg5IGMgMCwwIC0wLjAzLDAgLTAuMDQsMCAtMC40MywwLjAzIC0wLjc1LDAuMzkgLTAuNzMsMC44MiBsIDAuNTksMTAuMzQgYyAwLjAyLDAuNDMgMC40MSwwLjc1IDAuODIsMC43MyAwLjQzLC0wLjAzIDAuNzYsLTAuMzkgMC43MywtMC44MiBsIC0wLjU5LC0xMC4zNCBjIC0wLjAyLC0wLjQxIC0wLjM3LC0wLjczIC0wLjc4LC0wLjczIHoiCiAgICAgc3R5bGU9ImZpbGw6IzM1MzQyYyIKICAgICBpZD0icGF0aDE0IiAvPgogIDxyZWN0CiAgICAgeD0iLTcwLjQwNDkwNyIKICAgICB5PSItMzQuMTI5MjcyIgogICAgIHdpZHRoPSIyLjU1IgogICAgIGhlaWdodD0iMTUuMjEiCiAgICAgcng9IjEuMjgiCiAgICAgcnk9IjEuMjgiCiAgICAgdHJhbnNmb3JtPSJyb3RhdGUoLTE3Ni43MSkiCiAgICAgc3R5bGU9ImZpbGw6I2ZmZDUyYSIKICAgICBpZD0icmVjdDE0IiAvPgogIDxwYXRoCiAgICAgZD0ibSA2Ny4xMzI4ODEsMzguNTM5MTUyIGMgMCwwIC0wLjA3LDAgLTAuMSwwIHYgMCBjIC0wLjk4LC0wLjA2IC0xLjczLC0wLjkgLTEuNjcsLTEuODggbCAwLjczLC0xMi42MyBjIDAuMDYsLTAuOTggMC45MSwtMS43MyAxLjg4LC0xLjY3IDAuNDcsMC4wMyAwLjkxLDAuMjQgMS4yMiwwLjU5IDAuMzIsMC4zNSAwLjQ3LDAuODEgMC40NSwxLjI4IGwgLTAuNzMsMTIuNjMgYyAtMC4wNSwwLjk0IC0wLjg0LDEuNjggLTEuNzcsMS42OCB6IG0gLTAuMDQsLTEgYyAwLjQ0LDAuMDMgMC44LC0wLjMgMC44MiwtMC43MyBsIDAuNzMsLTEyLjYzIGMgMC4wMSwtMC4yMSAtMC4wNiwtMC40MSAtMC4yLC0wLjU2IC0wLjE0LC0wLjE1IC0wLjMzLC0wLjI1IC0wLjU0LC0wLjI2IC0wLjQzLC0wLjAxIC0wLjgsMC4zIC0wLjgyLDAuNzMgbCAtMC43MywxMi42MyBjIC0wLjAyLDAuNDMgMC4zLDAuOCAwLjczLDAuODIgeiIKICAgICBzdHlsZT0iZmlsbDojMzUzNDJjIgogICAgIGlkPSJwYXRoMTUiIC8+CiAgPHJlY3QKICAgICB4PSItNzAuMjM5MzcyIgogICAgIHk9Ii00Ny4yNTI1ODMiCiAgICAgd2lkdGg9IjIuNTUiCiAgICAgaGVpZ2h0PSIxMi45MSIKICAgICByeD0iMS4yOCIKICAgICByeT0iMS4yOCIKICAgICB0cmFuc2Zvcm09InJvdGF0ZSgtMTc2LjcxKSIKICAgICBzdHlsZT0iZmlsbDojZmZkNTJhIgogICAgIGlkPSJyZWN0MTUiIC8+CiAgPHBhdGgKICAgICBkPSJtIDY2LjIxMjg4MSw1MS42MjkxNTIgYyAwLDAgLTAuMDcsMCAtMC4xLDAgdiAwIGMgLTAuOTgsLTAuMDYgLTEuNzMsLTAuOSAtMS42NywtMS44OCBsIDAuNTksLTEwLjM0IGMgMC4wNiwtMC45OCAwLjkxLC0xLjczIDEuODgsLTEuNjcgMC45OCwwLjA2IDEuNzMsMC45IDEuNjcsMS44OCBsIC0wLjU5LDEwLjM0IGMgLTAuMDUsMC45NCAtMC44NCwxLjY4IC0xLjc3LDEuNjggeiBtIC0wLjA0LC0xIGMgMC40LDAuMDIgMC44LC0wLjMgMC44MiwtMC43MyBsIDAuNTksLTEwLjM0IGMgMC4wMiwtMC40MyAtMC4zLC0wLjggLTAuNzMsLTAuODIgLTAuNDEsLTAuMDMgLTAuOCwwLjMgLTAuODIsMC43MyBsIC0wLjU5LDEwLjM0IGMgLTAuMDIsMC40MyAwLjMsMC44IDAuNzMsMC44MiB6IgogICAgIHN0eWxlPSJmaWxsOiMzNTM0MmMiCiAgICAgaWQ9InBhdGgxNiIgLz4KPC9zdmc+Cg=="

/**
 * The url of the synthesis server.
 * @type {string}
 */
const SERVER_HOST = "https://synthesis-service.scratch.mit.edu";

/**
 * How long to wait in ms before timing out requests to synthesis server.
 * @type {int}
 */
const SERVER_TIMEOUT = 10000; // 10 seconds

/**
 * Volume for playback of speech sounds, as a percentage.
 * @type {number}
 */
const SPEECH_VOLUME = 250;

/**
 * Voice ID's.
 */
const MALE_ID = "MALE";
const FEMALE_ID = "FEMALE";
const KITTEN_ID = "KITTEN";
const GIANT_ID = "GIANT";
const TENOR_ID = "TENOR";
const ALIEN_ID = "ALIEN";
const THUNDER_ID = "THUNDER";
const STONE_ID = "STONE";
const RUMBLE_ID = "RUMBLE";
const ECHO_ID = "ECHO";
const DRIFT_ID = "DRIFT";
const BREEZE_ID = "BREEZE";
const WAVE_ID = "WAVE";
const BLAZE_ID = "BLAZE";
const BOLT_ID = "BOLT";
const STARLIGHT_ID = "STARLIGHT";
const MIST_ID = "MIST";
const WHIRLWIND_ID = "WHIRLWIND";
const DAWN_ID = "DAWN";
const CRYSTAL_ID = "CRYSTAL";
const LULLABY_ID = "LULLABY";
const AURORA_ID = "AURORA";
const RADIANCE_ID = "RADIANCE";
const FLASH_ID = "FLASH";

/**
 * Language ids. The value for each language id is a valid Scratch locale.
 */
const ARABIC_ID = "ar";
const CHINESE_ID = "zh-cn";
const DANISH_ID = "da";
const DUTCH_ID = "nl";
const ENGLISH_ID = "en";
const FRENCH_ID = "fr";
const GERMAN_ID = "de";
const HINDI_ID = "hi";
const ICELANDIC_ID = "is";
const ITALIAN_ID = "it";
const JAPANESE_ID = "ja";
const KOREAN_ID = "ko";
const NORWEGIAN_ID = "nb";
const POLISH_ID = "pl";
const PORTUGUESE_BR_ID = "pt-br";
const PORTUGUESE_ID = "pt";
const ROMANIAN_ID = "ro";
const RUSSIAN_ID = "ru";
const SPANISH_ID = "es";
const SPANISH_419_ID = "es-419";
const SWEDISH_ID = "sv";
const TURKISH_ID = "tr";
const WELSH_ID = "cy";

/**
 * Class for the text2speech blocks.
 * @constructor
 */
class Scratch3Text2SpeechBlocks {
  constructor(runtime) {
    /**
     * The runtime instantiating this block package.
     * @type {Runtime}
     */
    this.runtime = runtime;

    /**
     * Map of soundPlayers by sound id.
     * @type {Map<string, SoundPlayer>}
     */
    this._soundPlayers = new Map();

    this._stopAllSpeech = this._stopAllSpeech.bind(this);
    if (this.runtime) {
      this.runtime.on("PROJECT_STOP_ALL", this._stopAllSpeech);
    }

    this._onTargetCreated = this._onTargetCreated.bind(this);
    if (this.runtime) {
      runtime.on("targetWasCreated", this._onTargetCreated);
    }

    /**
     * A list of all Scratch locales that are supported by the extension.
     * @type {Array}
     */
    this._supportedLocales = this._getSupportedLocales();
  }

  /**
   * An object with info for each voice.
   */
  get VOICE_INFO() {
    return {
      [MALE_ID]: {
        name: formatMessage({
          id: "text2speech.male",
          default: "Tenor",
          description: "Name for a male voice.",
        }),
        gender: "male",
        playbackRate: 1,
        pitch: 1,
      },
      [FEMALE_ID]: {
        name: formatMessage({
          id: "text2speech.female",
          default: "Alto",
          description: "Name for a female voice.",
        }),
        gender: "female",
        playbackRate: 1,
        pitch: 1,
      },
      [KITTEN_ID]: {
        name: formatMessage({
          id: "text2speech.kitten",
          default: "kitten",
          description: "A baby cat.",
        }),
        gender: "female",
        playbackRate: 1.41, // +6 semitones
        pitch: 1.5,
      },
      // [GIANT_ID]: {
      //   name: formatMessage({
      //     id: "text2speech.giant",
      //     default: "giant",
      //     description: "A giant.",
      //   }),
      //   gender: "male",
      //   playbackRate: 0.79, // -6 semitones
      //   pitch: 0.5,
      // },
      // [TENOR_ID]: {
      //   name: formatMessage({
      //     id: "text2speech.tenor",
      //     default: "tenor",
      //     description: "A tenor.",
      //   }),
      //   gender: "female",
      //   playbackRate: 1.41, // +6 semitones
      //   pitch: 0.5,
      // },
      [ALIEN_ID]: {
        name: formatMessage({
          id: "text2speech.alien",
          default: "alien",
          description: "An alien.",
        }),
        gender: "female",
        playbackRate: 0.79, // -6 semitones
        pitch: 1.5,
      },

      [GIANT_ID]: {
        name: formatMessage({
          id: "text2speech.giant",
          default: "Giant",
          description: "Male voice with low pitch and playback rate.",
        }),
        gender: "male",
        playbackRate: 0.7,
        pitch: 0.7,
      },
      // [STONE_ID]: {
      //   name: formatMessage({
      //     id: "text2speech.stone",
      //     default: "Stone",
      //     description: "Male voice with low pitch.",
      //   }),
      //   gender: "male",
      //   playbackRate: 1,
      //   pitch: 0.7,
      // },
      // [RUMBLE_ID]: {
      //   name: formatMessage({
      //     id: "text2speech.rumble",
      //     default: "Rumble",
      //     description: "Male voice with high playback rate and low pitch.",
      //   }),
      //   gender: "male",
      //   playbackRate: 1.3,
      //   pitch: 0.7,
      // },
      // [ECHO_ID]: {
      //   name: formatMessage({
      //     id: "text2speech.echo",
      //     default: "Echo",
      //     description: "Male voice with standard pitch and low playback rate.",
      //   }),
      //   gender: "male",
      //   playbackRate: 0.7,
      //   pitch: 1,
      // },
      // [DRIFT_ID]: {
      //   name: formatMessage({
      //     id: "text2speech.drift",
      //     default: "Drift",
      //     description: "Standard male voice.",
      //   }),
      //   gender: "male",
      //   playbackRate: 1,
      //   pitch: 1,
      // },
      // [BREEZE_ID]: {
      //   name: formatMessage({
      //     id: "text2speech.breeze",
      //     default: "Breeze",
      //     description: "Male voice with standard pitch and high playback rate.",
      //   }),
      //   gender: "male",
      //   playbackRate: 1.3,
      //   pitch: 1,
      // },
      // [WAVE_ID]: {
      //   name: formatMessage({
      //     id: "text2speech.wave",
      //     default: "Wave",
      //     description: "Male voice with high pitch and low playback rate.",
      //   }),
      //   gender: "male",
      //   playbackRate: 0.7,
      //   pitch: 1.3,
      // },
      // [BLAZE_ID]: {
      //   name: formatMessage({
      //     id: "text2speech.blaze",
      //     default: "Blaze",
      //     description: "High-pitched male voice.",
      //   }),
      //   gender: "male",
      //   playbackRate: 1,
      //   pitch: 1.3,
      // },
      [BOLT_ID]: {
        name: formatMessage({
          id: "text2speech.bolt",
          default: "Bolt",
          description: "Male voice with high pitch and playback rate.",
        }),
        gender: "male",
        playbackRate: 1.3,
        pitch: 1.3,
      },
      [STARLIGHT_ID]: {
        name: formatMessage({
          id: "text2speech.starlight",
          default: "Starlight",
          description: "Female voice with low pitch and playback rate.",
        }),
        gender: "female",
        playbackRate: 0.7,
        pitch: 0.7,
      },
      // [MIST_ID]: {
      //   name: formatMessage({
      //     id: "text2speech.mist",
      //     default: "Mist",
      //     description: "Female voice with low pitch.",
      //   }),
      //   gender: "female",
      //   playbackRate: 1,
      //   pitch: 0.7,
      // },
      [WHIRLWIND_ID]: {
        name: formatMessage({
          id: "text2speech.whirlwind",
          default: "Whirlwind",
          description: "Female voice with high playback rate and low pitch.",
        }),
        gender: "female",
        playbackRate: 1.3,
        pitch: 0.7,
      },
      //   [DAWN_ID]: {
      //     name: formatMessage({
      //       id: "text2speech.dawn",
      //       default: "Dawn",
      //       description:
      //         "Female voice with standard pitch and low playback rate.",
      //     }),
      //     gender: "female",
      //     playbackRate: 0.7,
      //     pitch: 1,
      //   },
      //   [CRYSTAL_ID]: {
      //     name: formatMessage({
      //       id: "text2speech.crystal",
      //       default: "Crystal",
      //       description: "Standard female voice.",
      //     }),
      //     gender: "female",
      //     playbackRate: 1,
      //     pitch: 1,
      //   },
      //   [LULLABY_ID]: {
      //     name: formatMessage({
      //       id: "text2speech.lullaby",
      //       default: "Lullaby",
      //       description:
      //         "Female voice with standard pitch and high playback rate.",
      //     }),
      //     gender: "female",
      //     playbackRate: 1.3,
      //     pitch: 1,
      //   },
      //   [AURORA_ID]: {
      //     name: formatMessage({
      //       id: "text2speech.aurora",
      //       default: "Aurora",
      //       description: "Female voice with high pitch and low playback rate.",
      //     }),
      //     gender: "female",
      //     playbackRate: 0.7,
      //     pitch: 1.3,
      //   },
      //   [RADIANCE_ID]: {
      //     name: formatMessage({
      //       id: "text2speech.radiance",
      //       default: "Radiance",
      //       description: "High-pitched female voice.",
      //     }),
      //     gender: "female",
      //     playbackRate: 1,
      //     pitch: 1.3,
      //   },
      //   [FLASH_ID]: {
      //     name: formatMessage({
      //       id: "text2speech.flash",
      //       default: "Flash",
      //       description: "Female voice with high pitch and playback rate.",
      //     }),
      //     gender: "female",
      //     playbackRate: 1.3,
      //     pitch: 1.3,
      //   },
    };
  }

  /**
   * An object with information for each language.
   *
   * A note on the different sets of locales referred to in this extension:
   *
   * SCRATCH LOCALE
   *      Set by the editor, and used to store the language state in the project.
   *      Listed in l10n: https://github.com/LLK/scratch-l10n/blob/master/src/supported-locales.js
   * SUPPORTED LOCALE
   *      A Scratch locale that has a corresponding extension locale.
   * EXTENSION LOCALE
   *      A locale corresponding to one of the available spoken languages
   *      in the extension. There can be multiple supported locales for a single
   *      extension locale. For example, for both written versions of chinese,
   *      zh-cn and zh-tw, we use a single spoken language (Mandarin). So there
   *      are two supported locales, with a single extension locale.
   * SPEECH SYNTH LOCALE
   *      A different locale code system, used by our speech synthesis service.
   *      Each extension locale has a speech synth locale.
   */
  get LANGUAGE_INFO() {
    return {
      [ARABIC_ID]: {
        name: "Arabic",
        locales: ["ar"],
        speechSynthLocale: "arb",
        singleGender: true,
      },
      [CHINESE_ID]: {
        name: "Chinese (Mandarin)",
        locales: ["zh-cn", "zh-tw"],
        speechSynthLocale: "cmn-CN",
        singleGender: true,
      },
      [DANISH_ID]: {
        name: "Danish",
        locales: ["da"],
        speechSynthLocale: "da-DK",
      },
      [DUTCH_ID]: {
        name: "Dutch",
        locales: ["nl"],
        speechSynthLocale: "nl-NL",
      },
      [ENGLISH_ID]: {
        name: "English",
        locales: ["en"],
        speechSynthLocale: "en-US",
      },
      [FRENCH_ID]: {
        name: "French",
        locales: ["fr"],
        speechSynthLocale: "fr-FR",
      },
      [GERMAN_ID]: {
        name: "German",
        locales: ["de"],
        speechSynthLocale: "de-DE",
      },
      [HINDI_ID]: {
        name: "Hindi",
        locales: ["hi"],
        speechSynthLocale: "hi-IN",
        singleGender: true,
      },
      [ICELANDIC_ID]: {
        name: "Icelandic",
        locales: ["is"],
        speechSynthLocale: "is-IS",
      },
      [ITALIAN_ID]: {
        name: "Italian",
        locales: ["it"],
        speechSynthLocale: "it-IT",
      },
      [JAPANESE_ID]: {
        name: "Japanese",
        locales: ["ja", "ja-hira"],
        speechSynthLocale: "ja-JP",
      },
      [KOREAN_ID]: {
        name: "Korean",
        locales: ["ko"],
        speechSynthLocale: "ko-KR",
        singleGender: true,
      },
      [NORWEGIAN_ID]: {
        name: "Norwegian",
        locales: ["nb", "nn"],
        speechSynthLocale: "nb-NO",
        singleGender: true,
      },
      [POLISH_ID]: {
        name: "Polish",
        locales: ["pl"],
        speechSynthLocale: "pl-PL",
      },
      [PORTUGUESE_BR_ID]: {
        name: "Portuguese (Brazilian)",
        locales: ["pt-br"],
        speechSynthLocale: "pt-BR",
      },
      [PORTUGUESE_ID]: {
        name: "Portuguese (European)",
        locales: ["pt"],
        speechSynthLocale: "pt-PT",
      },
      [ROMANIAN_ID]: {
        name: "Romanian",
        locales: ["ro"],
        speechSynthLocale: "ro-RO",
        singleGender: true,
      },
      [RUSSIAN_ID]: {
        name: "Russian",
        locales: ["ru"],
        speechSynthLocale: "ru-RU",
      },
      [SPANISH_ID]: {
        name: "Spanish (European)",
        locales: ["es"],
        speechSynthLocale: "es-ES",
      },
      [SPANISH_419_ID]: {
        name: "Spanish (Latin American)",
        locales: ["es-419"],
        speechSynthLocale: "es-US",
      },
      [SWEDISH_ID]: {
        name: "Swedish",
        locales: ["sv"],
        speechSynthLocale: "sv-SE",
        singleGender: true,
      },
      [TURKISH_ID]: {
        name: "Turkish",
        locales: ["tr"],
        speechSynthLocale: "tr-TR",
        singleGender: true,
      },
      [WELSH_ID]: {
        name: "Welsh",
        locales: ["cy"],
        speechSynthLocale: "cy-GB",
        singleGender: true,
      },
    };
  }

  /**
   * The key to load & store a target's text2speech state.
   * @return {string} The key.
   */
  static get STATE_KEY() {
    return "Scratch.text2speech";
  }

  /**
   * The default state, to be used when a target has no existing state.
   * @type {Text2SpeechState}
   */
  static get DEFAULT_TEXT2SPEECH_STATE() {
    return {
      voiceId: FEMALE_ID,
      voiceSpeed: 1,
    };
  }

  /**
   * A default language to use for speech synthesis.
   * @type {string}
   */
  get DEFAULT_LANGUAGE() {
    return ENGLISH_ID;
  }

  /**
   * @param {Target} target - collect  state for this target.
   * @returns {Text2SpeechState} the mutable state associated with that target. This will be created if necessary.
   * @private
   */
  _getState(target) {
    let state = target.getCustomState(Scratch3Text2SpeechBlocks.STATE_KEY);
    if (!state) {
      state = Clone.simple(Scratch3Text2SpeechBlocks.DEFAULT_TEXT2SPEECH_STATE);
      target.setCustomState(Scratch3Text2SpeechBlocks.STATE_KEY, state);
    }
    return state;
  }

  /**
   * When a Target is cloned, clone the state.
   * @param {Target} newTarget - the newly created target.
   * @param {Target} [sourceTarget] - the target used as a source for the new clone, if any.
   * @listens Runtime#event:targetWasCreated
   * @private
   */
  _onTargetCreated(newTarget, sourceTarget) {
    if (sourceTarget) {
      const state = sourceTarget.getCustomState(
        Scratch3Text2SpeechBlocks.STATE_KEY
      );
      if (state) {
        newTarget.setCustomState(
          Scratch3Text2SpeechBlocks.STATE_KEY,
          Clone.simple(state)
        );
      }
    }
  }

  /**
   * @returns {object} metadata for this extension and its blocks.
   */
  getInfo() {
    // Only localize the default input to the "speak" block if we are in a
    // supported language.
    let defaultTextToSpeak = "hello";
    let defaultSpeed = 1;
    if (this.isSupportedLanguage(this.getEditorLanguage())) {
      defaultTextToSpeak = formatMessage({
        id: "text2speech.defaultTextToSpeak",
        default: "hello",
        description: "hello: the default text to speak",
      });
    }

    return {
      id: "text2speech",
      name: formatMessage({
        id: "text2speech.categoryName",
        default: "Speak",
        description: "Name of the Text to Speech extension.",
      }),
      blockIconURI: blockIconURI,
      menuIconURI: menuIconURI,
      blocks: [
        {
          opcode: "marty_speakAndWait",
          raftType: "Marty",
          blockIconURI: martyBlockIconURI,
          // colour: "#5ba591",
          // colourSecondary: "#498474",
          text: formatMessage({
            id: "text2speech.marty_speakAndWaitBlock",
            default: "Marty speak [WORDS]",
            description: "Speak some words.",
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            WORDS: {
              type: ArgumentType.STRING,
              defaultValue: defaultTextToSpeak,
            },
          },
        },
        {
          opcode: "speakAndWait",
          text: formatMessage({
            id: "text2speech.speakAndWaitBlock",
            default: "speak [WORDS]",
            description: "Speak some words.",
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            WORDS: {
              type: ArgumentType.STRING,
              defaultValue: defaultTextToSpeak,
            },
          },
        },
        {
          opcode: "setVoiceSpeed",
          text: formatMessage({
            id: "text2speech.setVoiceSpeedBlock",
            default: "set voice speed to [SPEED]",
            description: "Set the voice speed for speech synthesis.",
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            SPEED: {
              type: ArgumentType.NUMBER,
              menu: "speeds",
              defaultValue: defaultSpeed,
            },
          },
        },
        {
          opcode: "setVoice",
          text: formatMessage({
            id: "text2speech.setVoiceBlock",
            default: "set voice to [VOICE]",
            description: "Set the voice for speech synthesis.",
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            VOICE: {
              type: ArgumentType.STRING,
              menu: "voices",
              defaultValue: FEMALE_ID,
            },
          },
        },
        {
          opcode: "setLanguage",
          text: formatMessage({
            id: "text2speech.setLanguageBlock",
            default: "set accent to [LANGUAGE]",
            description: "Set the language for speech synthesis.",
          }),
          blockType: BlockType.COMMAND,
          arguments: {
            LANGUAGE: {
              type: ArgumentType.STRING,
              menu: "languages",
              defaultValue: this.getCurrentLanguage(),
            },
          },
        },
      ],
      menus: {
        voices: {
          acceptReporters: true,
          items: this.getVoiceMenu(),
        },
        languages: {
          acceptReporters: true,
          items: this.getLanguageMenu(),
        },
        speeds: {
          acceptReporters: true,
          items: this.getSpeedMenu(),
        },
      },
    };
  }

  /**
   * Get the language code currently set in the editor, or fall back to the
   * browser locale.
   * @return {string} a Scratch locale code.
   */
  getEditorLanguage() {
    const locale =
      formatMessage.setup().locale ||
      navigator.language ||
      navigator.userLanguage ||
      this.DEFAULT_LANGUAGE;
    return locale.toLowerCase();
  }

  /**
   * Get the language code currently set for the extension.
   * @returns {string} a Scratch locale code.
   */
  getCurrentLanguage() {
    const stage = this.runtime.getTargetForStage();
    if (!stage) return this.DEFAULT_LANGUAGE;
    // If no language has been set, set it to the editor locale (or default).
    if (!stage.textToSpeechLanguage) {
      this.setCurrentLanguage(this.getEditorLanguage());
    }
    return stage.textToSpeechLanguage;
  }

  /**
   * Set the language code for the extension.
   * It is stored in the stage so it can be saved and loaded with the project.
   * @param {string} locale a locale code.
   */
  setCurrentLanguage(locale) {
    const stage = this.runtime.getTargetForStage();
    if (!stage) return;

    if (this.isSupportedLanguage(locale)) {
      stage.textToSpeechLanguage = this._getExtensionLocaleForSupportedLocale(
        locale
      );
    }

    // Support language names dropped onto the menu via reporter block
    // such as a variable containing a language name (in any language),
    // or the translate extension's language reporter.
    const localeForDroppedName = languageNames.nameMap[locale.toLowerCase()];
    if (
      localeForDroppedName &&
      this.isSupportedLanguage(localeForDroppedName)
    ) {
      stage.textToSpeechLanguage = this._getExtensionLocaleForSupportedLocale(
        localeForDroppedName
      );
    }

    // If the language is null, set it to the default language.
    // This can occur e.g. if the extension was loaded with the editor
    // set to a language that is not in the list.
    if (!stage.textToSpeechLanguage) {
      stage.textToSpeechLanguage = this.DEFAULT_LANGUAGE;
    }
  }

  /**
   * Get the extension locale for a supported locale, or null.
   * @param {string} locale a locale code.
   * @returns {?string} a locale supported by the extension.
   */
  _getExtensionLocaleForSupportedLocale(locale) {
    for (const lang in this.LANGUAGE_INFO) {
      if (this.LANGUAGE_INFO[lang].locales.includes(locale)) {
        return lang;
      }
    }
    log.error(`cannot find extension locale for locale ${locale}`);
  }

  /**
   * Get the locale code used by the speech synthesis server corresponding to
   * the current language code set for the extension.
   * @returns {string} a speech synthesis locale.
   */
  _getSpeechSynthLocale() {
    let speechSynthLocale = this.LANGUAGE_INFO[this.DEFAULT_LANGUAGE]
      .speechSynthLocale;
    if (this.LANGUAGE_INFO[this.getCurrentLanguage()]) {
      speechSynthLocale = this.LANGUAGE_INFO[this.getCurrentLanguage()]
        .speechSynthLocale;
    }
    return speechSynthLocale;
  }

  /**
   * Get an array of the locales supported by this extension.
   * @returns {Array} An array of locale strings.
   */
  _getSupportedLocales() {
    return Object.keys(this.LANGUAGE_INFO).reduce(
      (acc, lang) => acc.concat(this.LANGUAGE_INFO[lang].locales),
      []
    );
  }

  /**
   * Check if a Scratch language code is in the list of supported languages for the
   * speech synthesis service.
   * @param {string} languageCode the language code to check.
   * @returns {boolean} true if the language code is supported.
   */
  isSupportedLanguage(languageCode) {
    return this._supportedLocales.includes(languageCode);
  }

  /**
   * Get the menu of voices for the "set voice" block.
   * @return {array} the text and value for each menu item.
   */
  getVoiceMenu() {
    return Object.keys(this.VOICE_INFO).map((voiceId) => ({
      text: this.VOICE_INFO[voiceId].name,
      value: voiceId,
    }));
  }

  getSpeedMenu() {
    return [
      { text: "normal", value: 1 },
      { text: "fast", value: 1.4 },
      { text: "slow", value: 0.7 },
    ];
  }

  /**
   * Get the localized menu of languages for the "set language" block.
   * For each language:
   *   if there is a custom translated spoken language name, use that;
   *   otherwise use the translation in the languageNames menuMap;
   *   otherwise fall back to the untranslated name in LANGUAGE_INFO.
   * @return {array} the text and value for each menu item.
   */
  getLanguageMenu() {
    const editorLanguage = this.getEditorLanguage();
    // Get the array of localized language names
    const localizedNameMap = {};
    let nameArray = languageNames.menuMap[editorLanguage];
    if (nameArray) {
      // Also get any localized names of spoken languages
      let spokenNameArray = [];
      if (languageNames.spokenLanguages) {
        spokenNameArray = languageNames.spokenLanguages[editorLanguage];
        nameArray = nameArray.concat(spokenNameArray);
      }
      // Create a map of language code to localized name
      // The localized spoken language names have been concatenated onto
      // the end of the name array, so the result of the forEach below is
      // when there is both a written language name (e.g. 'Chinese
      // (simplified)') and a spoken language name (e.g. 'Chinese
      // (Mandarin)', we always use the spoken version.
      nameArray.forEach((lang) => {
        localizedNameMap[lang.code] = lang.name;
      });
    }

    return Object.keys(this.LANGUAGE_INFO).map((key) => {
      let name = this.LANGUAGE_INFO[key].name;
      const localizedName = localizedNameMap[key];
      if (localizedName) {
        name = localizedName;
      }
      // Uppercase the first character of the name
      name = name.charAt(0).toUpperCase() + name.slice(1);
      return {
        text: name,
        value: key,
      };
    });
  }

  /**
   * Set the voice for speech synthesis for this sprite.
   * @param  {object} args Block arguments
   * @param {object} util Utility object provided by the runtime.
   */
  setVoice(args, util) {
    const state = this._getState(util.target);

    let voice = args.VOICE;

    // If the arg is a dropped number, treat it as a voice index
    let voiceNum = parseInt(voice, 10);
    if (!isNaN(voiceNum)) {
      voiceNum -= 1; // Treat dropped args as one-indexed
      voiceNum = MathUtil.wrapClamp(
        voiceNum,
        0,
        Object.keys(this.VOICE_INFO).length - 1
      );
      voice = Object.keys(this.VOICE_INFO)[voiceNum];
    }

    // Only set the voice if the arg is a valid voice id.
    if (Object.keys(this.VOICE_INFO).includes(voice)) {
      state.voiceId = voice;
    }
  }

  /**
   * Set the language for speech synthesis.
   * @param  {object} args Block arguments
   */
  setLanguage(args) {
    this.setCurrentLanguage(args.LANGUAGE);
  }

  /**
   * Stop all currently playing speech sounds.
   */
  _stopAllSpeech() {
    this._soundPlayers.forEach((player) => {
      player.stop();
    });
  }

  /**
   * Set the speed of the voice.
   * @param  {object} args Block arguments
   * @param {object} util Utility object provided by the runtime.
   */
  setVoiceSpeed(args, util) {
    const connectedRaft = getRaftUsingTargetId(util.target.id);
    const state = this._getState(util.target);

    let speed = args.SPEED;

    // Only set the voice if the arg is a valid speed in the range of 0.001 = 2
    if (speed >= 0.1 && speed <= 2) {
      state.voiceSpeed = speed;
    } else {
      window.applicationManager.toaster.warn("Speed must be between 0.1 and 2");
    }
  }

  /**
   * Convert the provided text into a sound file and then play the file.
   * @param  {object} args Block arguments
   * @param {object} util Utility object provided by the runtime.
   * @return {Promise} A promise that resolves after playing the sound
   */
  marty_speakAndWait(args, util) {
    return this.speakHelper(args, util, 'marty');
  }

  async tryAllLanguagesIfUnsupported(gender, words) {
    const connectedRaft = getRaftUsingTargetId(util.target.id);
    try {
      const pathsObj = [{}];
      for (const languageKey of Object.keys(this.LANGUAGE_INFO)) {
        const language = this.LANGUAGE_INFO[languageKey].speechSynthLocale;
        const path = `${SERVER_HOST}/synth?locale=${language}&gender=${gender}&text=${encodeURIComponent(words.substring(0, 128))}`;
        pathsObj.push({
          language: this.LANGUAGE_INFO[languageKey].name,
          path
        });
      }
      const responses = await Promise.all(pathsObj.map(pathObj => fetchWithTimeout(pathObj.path, {}, SERVER_TIMEOUT)));
      const buffersPromises = responses.map(response => response.arrayBuffer() || Promise.resolve());
      const buffers = await Promise.all(buffersPromises);
      buffers.forEach((b, i) => pathsObj[i].buffer = b);
      // get the buffer with the largest size
      let correctBufferObj = pathsObj.reduce((prev, current) => (prev.buffer.byteLength > current.buffer.byteLength) ? prev : current);
      if (correctBufferObj.buffer.byteLength < 910) {
        // we don't have any data back  
        window.applicationManager.toaster.warn("Oops! Marty doesn't speak this language yet! Please try another language.");
        return correctBufferObj.buffer;
      }
      window.applicationManager.toaster.warn("Oops! Marty doesn't have an accent for this language yet! We will use the " + correctBufferObj.language + " accent instead.");
      return correctBufferObj.buffer;
    } catch (e) {
      console.log("error", e);
      return null;
    }
  }

  removeBannedWords(text) {
    // removes banned words from the text
    const BANNED_WORDS = ["gimp", "giimp", "giiimp", "gimmp", "gimmmp"];
    let regexPattern = '';

    BANNED_WORDS.forEach(word => {
      if (regexPattern.length > 0) {
        regexPattern += '|';
      }
      regexPattern += word.split('').join('.*?');
    });

    const regex = new RegExp(regexPattern, 'gi');
    return text.replace(regex, '');
  }


  speakHelper(args, util, blockType) {
    const connectedRaft = getRaftUsingTargetId(util.target.id);

    return new Promise((resolve, reject) => {
      // Cast input to string
      let words = Cast.toString(args.WORDS);
      words = this.removeBannedWords(words);
      let locale = this._getSpeechSynthLocale();

      const state = this._getState(util.target);

      let gender = this.VOICE_INFO[state.voiceId].gender;
      const playbackRate =
        this.VOICE_INFO[state.voiceId].playbackRate * state.voiceSpeed;
      const pitch = this.VOICE_INFO[state.voiceId].pitch;

      // Special case for voices where the synthesis service only provides a
      // single gender voice. In that case, always request the female voice,
      // and set special playback rates for the tenor and giant voices.
      if (this.LANGUAGE_INFO[this.getCurrentLanguage()].singleGender) {
        gender = "female";
      }

      if (state.voiceId === KITTEN_ID) {
        words = words.replace(/\S+/g, "meow");
        locale = this.LANGUAGE_INFO[this.DEFAULT_LANGUAGE].speechSynthLocale;
      }

      // Build up URL
      let path = `${SERVER_HOST}/synth`;
      path += `?locale=${locale}`;
      path += `&gender=${gender}`;
      path += `&text=${encodeURIComponent(words.substring(0, 128))}`;

      // Perform HTTP request to get audio file
      return fetchWithTimeout(path, {}, SERVER_TIMEOUT)
        .then(async (res) => {
          if (res.status !== 200) {
            throw new Error(
              `HTTP ${res.status} error reaching translation service`
            );
          }
          // if the length is 0, then we try all the languages in case the language is not supported
          const buffer = await res.arrayBuffer();
          if (buffer.byteLength === 909) { // when the buffer length is 909 we don't have data back suggesting that the language is not supported so we try all the languages
            const didWeFind = await this.tryAllLanguagesIfUnsupported(gender, words);
            if (didWeFind) {
              return didWeFind;
            }
          }
          return buffer;
        })
        .then((buffer) => {
          // Play the sound

          const audioContext = new AudioContext();
          return audioContext.decodeAudioData(buffer);
        })
        .then((decodedBuffer) => {
          const audioContext = new AudioContext();

          // Extend the buffer by 1 seconds to avoid truncation
          const sampleRate = decodedBuffer.sampleRate;
          const additionalTime = 1; // seconds
          const additionalSamples = additionalTime * sampleRate;

          // Create a new buffer with space for the original audio + extra seconds
          const extendedBuffer = audioContext.createBuffer(
            decodedBuffer.numberOfChannels,
            decodedBuffer.length + additionalSamples,
            sampleRate
          );

          // Copy the original audio data to the new buffer
          for (
            let channel = 0;
            channel < decodedBuffer.numberOfChannels;
            channel++
          ) {
            const oldData = decodedBuffer.getChannelData(channel);
            const newData = extendedBuffer.getChannelData(channel);

            // Copy data from old buffer to new buffer
            for (let i = 0; i < oldData.length; i++) {
              newData[i] = oldData[i];
            }

            // The rest of the new buffer will remain silent (values are 0 by default)
          }

          const processedDuration = extendedBuffer.duration / playbackRate; // Adjusted duration based on tempo change
          const maxDuration = Math.max(
            extendedBuffer.duration,
            processedDuration
          ); // Maximum of original and processed durations
          const sampleLength = maxDuration * extendedBuffer.sampleRate; // Sample length based on max duration

          const offlineContext = new OfflineAudioContext(
            1,
            sampleLength,
            44100
          );
          const gainNode = offlineContext.createGain();
          gainNode.gain.value = window.volume || (util.target.volume / 100) * 2.5;
          console.log("gainNode.gain.value", gainNode.gain.value);
          const source = offlineContext.createBufferSource();
          source.buffer = extendedBuffer;

          const pitchShifter = new PitchShifter(
            offlineContext,
            extendedBuffer,
            4096
          );
          pitchShifter.tempo = playbackRate;
          pitchShifter.pitch = pitch;

          // order matters here
          source.connect(pitchShifter.node);
          pitchShifter.connect(gainNode);
          gainNode.connect(offlineContext.destination);

          source.start();

          offlineContext
            .startRendering()
            .then((renderedBuffer) => {
              // The renderedBuffer contains the pitch-shifted audio data.
              // Can be converted to MP3 or any desired format for streaming.

              // Scratch3Mv2Blocks.increaseVolume(
              //   renderedBuffer,
              //   util.target.volume / 30
              // );

              const mp3SoundBuffers = Scratch3Mv2Blocks.convertSoundToMP3(
                renderedBuffer
              );
              const mp3SoundData = Scratch3Mv2Blocks.convertMp3BufferToData(
                mp3SoundBuffers
              );
              if (blockType === 'marty') {
                if (connectedRaft) {
                  connectedRaft.streamAudio(mp3SoundData, false, maxDuration * 1000);
                } else {
                  window.vm.runtime.stopAll();
                  return window.applicationManager.toaster.warn("You are not currently connected to a Marty. Please connect.");
                }
              } else {
                // play locally
                const base64Audio = this.arrayBufferToBase64(mp3SoundData);
                const dataURL = "data:audio/mp3;base64," + base64Audio;
                const audio = new Audio(dataURL);
                audio.play();
              }

              const timeout = setTimeout(() => {
                clearTimeout(timeout);
                resolve();
              }, maxDuration * 1000 + 800);
            })
            .catch(async (err) => {
              log.warn(err);
              // probably we are offline, so we can't use the speech service
              // instead we will use the meSpeak library
              return window.applicationManager.toaster.warn("Text to speech extension requires internet connection.");
              try {
                return Scratch3Mv2Blocks.speech2TextLocally(
                  state.voiceId,
                  words,
                  util.target,
                  true
                );
              } catch (error) {
                log.warn(error);
              }
            });
        });
    });
  }

  arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  /**
   * Convert the provided text into a sound file and then play the file.
   * @param  {object} args Block arguments
   * @param {object} util Utility object provided by the runtime.
   * @return {Promise} A promise that resolves after playing the sound
   */
  async speakAndWait(args, util) {
    return this.speakHelper(args, util, 'local');
  }
}

const effectTypes = {
  FASTER: "faster",
  SLOWER: "slower",
};

class AudioEffects {
  static get effectTypes() {
    return effectTypes;
  }
  constructor(buffer, speed, trimStart, trimEnd) {
    this.trimStartSeconds = (trimStart * buffer.length) / buffer.sampleRate;
    this.trimEndSeconds = (trimEnd * buffer.length) / buffer.sampleRate;
    this.adjustedTrimStartSeconds = this.trimStartSeconds;
    this.adjustedTrimEndSeconds = this.trimEndSeconds;

    // Some effects will modify the playback rate and/or number of samples.
    // Need to precompute those values to create the offline audio context.
    const pitchRatio = Math.pow(2, 4 / 12); // A major third
    let sampleCount = buffer.length;
    const affectedSampleCount = Math.floor(
      (this.trimEndSeconds - this.trimStartSeconds) * buffer.sampleRate
    );
    let adjustedAffectedSampleCount = affectedSampleCount;
    const unaffectedSampleCount = sampleCount - affectedSampleCount;

    this.playbackRate = speed;
    adjustedAffectedSampleCount = Math.floor(
      affectedSampleCount / this.playbackRate
    );
    sampleCount = unaffectedSampleCount + adjustedAffectedSampleCount;

    const durationSeconds = sampleCount / buffer.sampleRate;
    this.adjustedTrimEndSeconds =
      this.trimStartSeconds + adjustedAffectedSampleCount / buffer.sampleRate;
    this.adjustedTrimStart = this.adjustedTrimStartSeconds / durationSeconds;
    this.adjustedTrimEnd = this.adjustedTrimEndSeconds / durationSeconds;

    if (window.OfflineAudioContext) {
      this.audioContext = new window.OfflineAudioContext(
        1,
        sampleCount,
        buffer.sampleRate
      );
    } else {
      // Need to use webkitOfflineAudioContext, which doesn't support all sample rates.
      // Resample by adjusting sample count to make room and set offline context to desired sample rate.
      const sampleScale = 44100 / buffer.sampleRate;
      this.audioContext = new window.webkitOfflineAudioContext(
        1,
        sampleScale * sampleCount,
        44100
      );
    }

    // For the reverse effect we need to manually reverse the data into a new audio buffer
    // to prevent overwriting the original, so that the undo stack works correctly.
    // Doing buffer.reverse() would mutate the original data.
    if (name === effectTypes.REVERSE) {
      const originalBufferData = buffer.getChannelData(0);
      const newBuffer = this.audioContext.createBuffer(
        1,
        buffer.length,
        buffer.sampleRate
      );
      const newBufferData = newBuffer.getChannelData(0);
      const bufferLength = buffer.length;

      const startSamples = Math.floor(
        this.trimStartSeconds * buffer.sampleRate
      );
      const endSamples = Math.floor(this.trimEndSeconds * buffer.sampleRate);
      let counter = 0;
      for (let i = 0; i < bufferLength; i++) {
        if (i >= startSamples && i < endSamples) {
          newBufferData[i] = originalBufferData[endSamples - counter - 1];
          counter++;
        } else {
          newBufferData[i] = originalBufferData[i];
        }
      }
      this.buffer = newBuffer;
    } else {
      // All other effects use the original buffer because it is not modified.
      this.buffer = buffer;
    }

    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.buffer;
    this.name = name;
  }
  process(done) {
    // Some effects need to use more nodes and must expose an input and output
    let input;
    let output;
    this.source.playbackRate.setValueAtTime(
      this.playbackRate,
      this.adjustedTrimStartSeconds
    );
    this.source.playbackRate.setValueAtTime(1.0, this.adjustedTrimEndSeconds);
    if (input && output) {
      this.source.connect(input);
      output.connect(this.audioContext.destination);
    } else {
      // No effects nodes are needed, wire directly to the output
      this.source.connect(this.audioContext.destination);
    }

    this.source.start();

    this.audioContext.startRendering();
    this.audioContext.oncomplete = ({ renderedBuffer }) => {
      done(renderedBuffer, this.adjustedTrimStart, this.adjustedTrimEnd);
    };
  }
}

function getRaftUsingTargetId(targetId) {
  const raftId = window.raftManager.raftIdAndDeviceIdMap[targetId];
  const raft = window.applicationManager.connectedRafts[raftId];
  return raft;
}


module.exports = Scratch3Text2SpeechBlocks;
