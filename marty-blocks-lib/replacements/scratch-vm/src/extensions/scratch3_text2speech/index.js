const formatMessage = require("format-message");
const languageNames = require("scratch-translate-extension-languages");

const ArgumentType = require("../../extension-support/argument-type");
const BlockType = require("../../extension-support/block-type");
const Cast = require("../../util/cast");
const MathUtil = require("../../util/math-util");
const Clone = require("../../util/clone");
const log = require("../../util/log");
const fetchWithTimeout = require("../../util/fetch-with-timeout");
const Scratch3Mv2Blocks = require("marty-blocks-lib/src/Scratch3Mv2Blocks");
// import { PitchShifter } from 'soundtouchjs';
const SimpleFilter = require("soundtouchjs").SimpleFilter;
const PitchShifter = require("soundtouchjs").PitchShifter;
const SoundTouch = require("soundtouchjs").SoundTouch;

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
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgaWQ9InN2ZzM5NSIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgNDAgNDAiCiAgIGhlaWdodD0iNDBweCIKICAgd2lkdGg9IjQwcHgiPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTM5OSI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+bWljcm9iaXQtYmxvY2staWNvbjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTAuMiAoNTUwNDcpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogIDx0aXRsZQogICAgIGlkPSJ0aXRsZTIiPm1pY3JvYml0LWJsb2NrLWljb248L3RpdGxlPgogIDxkZXNjCiAgICAgaWQ9ImRlc2M0Ij5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICA8ZGVmcwogICAgIGlkPSJkZWZzNiIgLz4KICA8cGF0aAogICAgIHN0eWxlPSJvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6IzdmZGRjNjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC4wNTI2NDk2NDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7bWFya2VyOm5vbmU7cGFpbnQtb3JkZXI6c3Ryb2tlIGZpbGwgbWFya2VycyIKICAgICBkPSJNIDM5LjA4MTA5MSwyMCBBIDE5LjA4MTA5MSwxOS4wODEwOTEgMCAwIDEgMjAsMzkuMDgxMDkyIDE5LjA4MTA5MSwxOS4wODEwOTEgMCAwIDEgMC45MTg5MDk0NywyMCAxOS4wODEwOTEsMTkuMDgxMDkxIDAgMCAxIDIwLDAuOTE4OTA4NjUgMTkuMDgxMDkxLDE5LjA4MTA5MSAwIDAgMSAzOS4wODEwOTEsMjAgWiIKICAgICBpZD0icGF0aDg3MSIgLz4KICA8ZwogICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuMTYwNTE1MTEsMCwwLDAuMTYwNTE1MTEsMy4xMjExOTY1LC0wLjg4NzE3NDUxKSIKICAgICBpZD0iZzE0OTEiPgogICAgPGcKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDEuNTA2MDMzLDAsMCwxLjUwNjAzMywtNTMuMDY1MzYsLTc1LjIxNTk4NSkiCiAgICAgICBpZD0iZzEzMDUtOSI+CiAgICAgIDxnCiAgICAgICAgIGlkPSJnMTI2MC05Ij4KICAgICAgICA8cGF0aAogICAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6I2ZmZDQyYTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC40OTk4Njg0NTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgICAgZD0ibSAxNTguMTYwMDgsMTE0LjMwNzkxIGMgNC41NjQwNiwtMS4zODUxNiA0LjU1NDUzLDQuOTQ5MDIgNC41NDUxMiw3LjkwNjk3IDAuNDYyMDIsNy45OTgxMiAwLjAzNTEsMTYuMDcyODEgLTEuMDA3NDYsMjMuOTkxOTQgLTIuMjg2MDksNS4xNzA4IC02LjA0MDgsLTAuNDA3NzIgLTQuMjQ0MDgsLTMuODUzNTYgMC4xNDk2OSwtOS4zMzUwNCAwLjQ4NjUsLTE4LjY5ODMxIDAuNzA2NDIsLTI4LjA0NTM1IHoiCiAgICAgICAgICAgaWQ9InBhdGgxMjU0LTEiIC8+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBzdHlsZT0ib3BhY2l0eToxO3ZlY3Rvci1lZmZlY3Q6bm9uZTtmaWxsOiNmZmQ0MmE7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuNTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgICAgZD0ibSAxNTQuNDUwNTIsMTc1LjIwODc4IGMgMi42MDk2NCwyLjU4MDEgNi41NTQ4OCwwLjI1MjkxIDYuMzE4NzgsLTMuMTc0OTggMS4yMzE4NCwtNi4wODIxOSAxLjMzMzgyLC0xMi4zMzUwMSAxLjE5NTE5LC0xOC41MjM1NSAwLjUzODkyLC0zLjIwMDE5IC0xLjk1OTg5LC04LjQxMTM1IC01LjQ2MjU4LC00Ljk5MDQyIC0wLjk5MzQ4LDMuOTU5NTkgLTAuMzQ4ODYsOC41ODY5NSAtMS4wOTYxOCwxMi44MTQyNyAtMC4yNjUwNCw0LjYyNzk3IC0wLjY0NDE2LDkuMjQ5NDIgLTAuOTU1MjEsMTMuODc0NjggeiIKICAgICAgICAgICBpZD0icGF0aDEyNTYtNCIgLz4KICAgICAgPC9nPgogICAgICA8ZwogICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgtMSwwLDAsMSwyMTAuMTEzOTUsMC4xMjY5MzIwMSkiCiAgICAgICAgIGlkPSJnMTI2MC0wLTkiPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZDQyYTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC41O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgICAgZD0ibSAxNTguMTYwMDgsMTE0LjMwNzkxIGMgNi4yNzY0NiwtMC4yNTE5MSA0LjExNzEsOC4xNDE4OSA0LjcwOTA1LDEyLjIwMDk2IDAuMTI1NDQsNi41ODM3IC0wLjMxMjk1LDEzLjE3MTUxIC0xLjE3MTM4LDE5LjY5Nzk1IC0zLjM0NTk0LDUuNDk0MjYgLTYuMjMyODcsLTMuNTM3MjMgLTQuMTk4MzIsLTYuNDI3MjIgMC4xNjUwNywtOC40OTE5MyAwLjQ2MDkyLC0xNi45ODA2IDAuNjYwNjUsLTI1LjQ3MTY5IHoiCiAgICAgICAgICAgaWQ9InBhdGgxMjU0LTktMSIgLz4KICAgICAgICA8cGF0aAogICAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6I2ZmZDQyYTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC41O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICBkPSJtIDE1NC4yNDAwNSwxNzUuNDE5MjYgYyAxLjUyNzUxLDEuNDgyMjQgNC4xMTEyMiwxLjA2Njg0IDUuNDA4MjMsLTAuNTA5MzEgMS4zMTkyNSwtMS4zNzY3OSAxLjk2NjQyLC0zLjM4NTUxIDEuNjQxNzksLTUuMjcwNjEgMC42MTQyMSwtNi43MjY1MyAxLjE4NzE5LC0xMy41MzI5NyAwLjI3MjYxLC0yMC4yNjA1NyAtMC44MDM5OSwtMS44MTkwMyAtMy40Mjk3MSwtMi4xOTMwMyAtNC43NjMzMSwtMC43MzY0NSAtMS45Mzc3NCwxLjY4MjQ5IC0wLjUwMTc3LDQuMTg0NDggLTAuOTc4NTQsNi4zMDg3OSAtMC4zODQ5Nyw2LjgzMzI1IC0xLjEzNTIsMTMuNjM5MjUgLTEuNTgwNzgsMjAuNDY4MTUgeiIKICAgICAgICAgICBpZD0icGF0aDEyNTYtMy0wIiAvPgogICAgICA8L2c+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6IzViY2JmNTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC40MzAwMzg5cHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJtIDEwNC40NzU3MywxMDMuNjgwNDkgYyAxOC4yOTI3NCwwLjAyNDQgNTQuODgyOCwtMy4zMjgzNCA1NC40NjE4NSw3LjYzMTIzIC0wLjQyMDk1LDEwLjk1OTU2IC0xLjUwNTUzLDU5LjQ0NTY2IC0xLjU4OTM3LDYxLjI3NjY4IC0wLjA4MzgsMS44MzEwMiAtMC4wNDI5LDMuMzY1MTkgLTEuNzM2NCwzLjQ5MDM2IC0xLjY5MzQ2LDAuMTI1MTcgLTk1Ljc0MjMwNywwLjAxNDUgLTk5LjMxMzk3OSwwLjIzMjQ4IC0zLjU3MTY3MiwwLjIxODAyIC0zLjcwNDE4NCwtMS45OTMzNCAtMy44NTI3NzksLTMuMzg5NzYgLTAuMTQ4NTk1LC0xLjM5NjQyIC0wLjc5NTYzOCwtNTUuODkyOTQgLTAuNjA5NDE1LC02My4wNzUzNCAwLjIxOTA0OSwtOC40NDg0NiAzNC4zNDczNTksLTYuMTkwMDUgNTIuNjQwMDkzLC02LjE2NTY1IHoiCiAgICAgICAgIGlkPSJyZWN0MTIzNi03IiAvPgogICAgICA8cGF0aAogICAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjU7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgZD0ibSAxMDQuNzkxNTQsMTUwLjIwNTg2IDYuNzg0OCwzLjkxNzIxIHYgNy40MjY4IGwgLTYuNzAwNzQsMy44Njg2OCAtNi41ODk5ODYsLTMuODA0NzMgdiAtNy43NTM0IHoiCiAgICAgICAgIGlkPSJwYXRoMTE3Ni01IiAvPgogICAgPC9nPgogICAgPGcKICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02LjY3OTg2ODIsLTIuNzUwNTM0KSIKICAgICAgIGlkPSJnMTMzNiI+CiAgICAgIDxnCiAgICAgICAgIGlkPSJnMTMyNCIKICAgICAgICAgdHJhbnNmb3JtPSJyb3RhdGUoMTQuODY0NDkzLDcyLjQwMzI5OCwxNDQuNTQ4MTkpIj4KICAgICAgICA8cGF0aAogICAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC43NTE1MzUzO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICBkPSJtIDcwLjE1MDk1Nyw4Mi4xMDY2NyBjIC04Ljk1NTUzNSwtMC4wMTgzNCAtMTcuODA2NDg2LDMuNzM2NjE4IC0yNC4wODg4MywxMC4xMDYwNzUgLTMuMzA5MjM3LC0yLjk2MDkyOSAtNi40OTAxMTksLTYuMDg5MTQ5IC0xMC4wMjIxODgsLTguNzg0ODYxIC0yLjY2NzQwNCwtMC4xOTk0NDMgLTcuNzY5MDA2LDIuNzg0MjczIC0zLjM5ODA2MSw0LjQ4NTIwNyAzLjU4MjIyNywyLjUyMTIyMSA2Ljg1NTUzMSw1LjUxNDU4NiA5LjQxNjE4OSw5LjA4NTEgLTkuMjMwNzQzLDEyLjgxMTgzOSAtOC42NjQ0OTEsMzEuNTYwNjc5IDEuMjU1MTU3LDQzLjgxOTkxOSA3LjgwMDI2MiwxMC4xMjM5OSAyMS41MTYwNDMsMTUuMzA5MDkgMzQuMDI5MjgxLDEyLjQyODggQyA5MS40MDUzMzQsMTUwLjM3OTg2IDEwMi41MDI2OCwxMzcuOTAxMTMgMTA0LjUxOTUsMTIzLjgxMTkgMTA2LjkzMjYsMTA5LjM3NzYyIDk5Ljg4ODE2Myw5My43NDQyODQgODYuOTk2Mzg4LDg2LjU3NzU2OCA4MS44OTg1MDksODMuNjUwNjg0IDc2LjAzMjA3NCw4Mi4wNzcxNzkgNzAuMTUwOTU3LDgyLjEwNjY3IFoiCiAgICAgICAgICAgaWQ9InBhdGgxMDYzLTIiIC8+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjM5NzY4NzQxcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICBkPSJtIDMwLjUyMTQxLDg2LjI4MTI1MyBjIC0xLjI5MjMzNiwtMS4wMTQ5MTkgLTQuMzkwNzk2LC0zLjUyNDgwNiAtNS40MDk0OTcsLTQuNzE0ODc3IDEuMTE0MzkxLC0wLjc2MzUzIDM0LjgwODQ5LC0xNS42MzEwNzMgNDUuNDQ1MTQ3LC0yMS41NDk3NzkgMS4xMDE1MjQsMC45NTMyOTMgMi4xOTE0MiwyLjk1Mzg1IDMuMTAzNDQyLDQuOTA4ODI5IC05LjE3OTI5Nyw1Ljg4MjE0MiAtMzguNTgyMjg0LDE4LjA3MDk1NiAtMzcuNjIwMTk5LDE4LjUwMjcxMyAtMy41NTEyMDksMS44MzI4NiAtMi4zMzM3NzcsMS4wMjI0MTkgLTUuNTE4ODkzLDIuODUzMTE0IHoiCiAgICAgICAgICAgaWQ9InBhdGgxMDYzLTMiIC8+CiAgICAgIDwvZz4KICAgICAgPGcKICAgICAgICAgaWQ9ImcxMzI4IgogICAgICAgICB0cmFuc2Zvcm09InJvdGF0ZSgtMTYuOTE1MzY2LDE0My44NjA1NCw5Ni4wMTI4NzYpIj4KICAgICAgICA8cGF0aAogICAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC43NTE1MzUzO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICBkPSJtIDE3MS43NTU0OCw4MC41MjQ0OTQgYyAtMy4zOTU4MiwyLjkxNjkxIC02LjQxNjM3LDYuMjQ1MTIyIC05LjU3MzU4LDkuNDE0OTczIC0xMC41MjgzNSwtOC44NTIwMjYgLTI2LjUzNjExLC0xMC4wMzU3NzMgLTM4LjMyNjQxLC0zLjAxOTYwMSAtMTIuNDgxMzksNy4wMTk1NjUgLTE5LjcwMzM0LDIxLjg5OTk5NCAtMTcuODk3NzcsMzYuMDUxNTM0IDEuNDI2OTMsMTMuOTU4NzkgMTEuODUzMDUsMjYuNjY0OTkgMjUuNTY0MDEsMzAuMTA3NDUgMTIuNDU0NDgsMy40MzI1NCAyNi40NTM4MywtMS4xODg5OCAzNC43NTM1NCwtMTEuMDA0MjkgMTAuMjg4NjgsLTExLjU1NTYgMTEuOTY5NDEsLTI5Ljc5MDc5IDMuODM2ODUsLTQyLjk3NzU4NyAtMS4xNDE4MiwtMi42MTE3MDUgLTUuMTgxODUsLTQuNzcyNjExIC0xLjg1OTA3LC03LjM2MzA0OCAyLjI5MTEsLTMuNzIxMjE1IDYuMTY0MjIsLTUuOTIwNTI5IDkuMTE0MzIsLTkuMDA2NTc1IC0xLjY4NDUzLC0xLjA2OTA4NCAtMy45MjQ1MiwtMS4wMTI3NjUgLTUuNjExODksLTIuMjAyODU2IHoiCiAgICAgICAgICAgaWQ9InBhdGgxMDEyLTMiIC8+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjM5NzY4NzQxcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICBkPSJtIDE3Ny4zNjc3LDgyLjcyNzE0NiBjIDMuMTc3MjMsLTIuMTAyNDQ0IDQuMjQzNzcsLTQuMjUwNjc5IDQuMjQzNzcsLTQuMjUwNjc5IC0yLjg2NzIzLC0xLjUzNTk5MyAtMjYuOTA1MDgsLTEyLjU3NDczOSAtNDIuNjU2NDYsLTIwLjc3MDk5NyAtMS4yNzgwOSwwLjY5NDgyMiAtMy4xNTUzMyw0LjM0MTA0OCAtMy43Njg4OCw1LjI1MzA3OCAxMC45NjEzOCw3LjY2NTQ2NiAzNi4zNzIzNywxOC4xNjIxOTMgNDIuMTgxNTcsMTkuNzY4NTk4IHoiCiAgICAgICAgICAgaWQ9InBhdGgxMDYzLTUtNiIgLz4KICAgICAgPC9nPgogICAgPC9nPgogICAgPGcKICAgICAgIHN0eWxlPSJzdHJva2U6IzAwMDAwMDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMS41MDMwNzA2LDAsMCwxLjUwMzA3MDYsLTU1Ljc0MDE0MSwtNzUuMDg5NjU1KSIKICAgICAgIGlkPSJnMTE3NCI+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC4xNTk3MDAzcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJtIDg5LjI2NTg0MSwxMjcuNDAzMjUgYSA1LjMyMzYxNCw1LjMyMzYxNCAwIDAgMSAtNS4zMjM2MSw1LjMyMzYxIDUuMzIzNjE0LDUuMzIzNjE0IDAgMCAxIC01LjMyMzYyLC01LjMyMzYxIDUuMzIzNjE0LDUuMzIzNjE0IDAgMCAxIDUuMzIzNjIsLTUuMzIzNjIgNS4zMjM2MTQsNS4zMjM2MTQgMCAwIDEgNS4zMjM2MSw1LjMyMzYyIHoiCiAgICAgICAgIGlkPSJwYXRoMTA0Ni03LTYtNiIgLz4KICAgIDwvZz4KICAgIDxwYXRoCiAgICAgICBpZD0icGF0aDEwNDYtNy01IgogICAgICAgZD0ibSAxNDkuMjEzNTgsMTE3LjQ0OTI0IGEgOC4wMDE3Njc4LDguMDAxNzY3OCAwIDAgMSAtOS4yMzMyMSw2LjU0MjQ5IDguMDAxNzY3OCw4LjAwMTc2NzggMCAwIDEgLTYuNTQyNSwtOS4yMzMyMSA4LjAwMTc2NzgsOC4wMDE3Njc4IDAgMCAxIDkuMjMzMjMsLTYuNTQyNSA4LjAwMTc2NzgsOC4wMDE3Njc4IDAgMCAxIDYuNTQyNDgsOS4yMzMyMiB6IgogICAgICAgc3R5bGU9Im9wYWNpdHk6MTt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjI0MDA0MDgycHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIiAvPgogIDwvZz4KPC9zdmc+Cg==";

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
      [GIANT_ID]: {
        name: formatMessage({
          id: "text2speech.giant",
          default: "giant",
          description: "A giant.",
        }),
        gender: "male",
        playbackRate: 0.79, // -6 semitones
        pitch: 0.5,
      },
      [TENOR_ID]: {
        name: formatMessage({
          id: "text2speech.tenor",
          default: "tenor",
          description: "A tenor.",
        }),
        gender: "female",
        playbackRate: 1.41, // +6 semitones
        pitch: 0.5,
      },
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

      [THUNDER_ID]: {
        name: formatMessage({
          id: "text2speech.thunder",
          default: "Thunder",
          description: "Male voice with low pitch and playback rate.",
        }),
        gender: "male",
        playbackRate: 0.7,
        pitch: 0.7,
      },
      [STONE_ID]: {
        name: formatMessage({
          id: "text2speech.stone",
          default: "Stone",
          description: "Male voice with low pitch.",
        }),
        gender: "male",
        playbackRate: 1,
        pitch: 0.7,
      },
      [RUMBLE_ID]: {
        name: formatMessage({
          id: "text2speech.rumble",
          default: "Rumble",
          description: "Male voice with high playback rate and low pitch.",
        }),
        gender: "male",
        playbackRate: 1.3,
        pitch: 0.7,
      },
      [ECHO_ID]: {
        name: formatMessage({
          id: "text2speech.echo",
          default: "Echo",
          description: "Male voice with standard pitch and low playback rate.",
        }),
        gender: "male",
        playbackRate: 0.7,
        pitch: 1,
      },
      [DRIFT_ID]: {
        name: formatMessage({
          id: "text2speech.drift",
          default: "Drift",
          description: "Standard male voice.",
        }),
        gender: "male",
        playbackRate: 1,
        pitch: 1,
      },
      [BREEZE_ID]: {
        name: formatMessage({
          id: "text2speech.breeze",
          default: "Breeze",
          description: "Male voice with standard pitch and high playback rate.",
        }),
        gender: "male",
        playbackRate: 1.3,
        pitch: 1,
      },
      [WAVE_ID]: {
        name: formatMessage({
          id: "text2speech.wave",
          default: "Wave",
          description: "Male voice with high pitch and low playback rate.",
        }),
        gender: "male",
        playbackRate: 0.7,
        pitch: 1.3,
      },
      [BLAZE_ID]: {
        name: formatMessage({
          id: "text2speech.blaze",
          default: "Blaze",
          description: "High-pitched male voice.",
        }),
        gender: "male",
        playbackRate: 1,
        pitch: 1.3,
      },
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
      [MIST_ID]: {
        name: formatMessage({
          id: "text2speech.mist",
          default: "Mist",
          description: "Female voice with low pitch.",
        }),
        gender: "female",
        playbackRate: 1,
        pitch: 0.7,
      },
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
      [DAWN_ID]: {
        name: formatMessage({
          id: "text2speech.dawn",
          default: "Dawn",
          description:
            "Female voice with standard pitch and low playback rate.",
        }),
        gender: "female",
        playbackRate: 0.7,
        pitch: 1,
      },
      [CRYSTAL_ID]: {
        name: formatMessage({
          id: "text2speech.crystal",
          default: "Crystal",
          description: "Standard female voice.",
        }),
        gender: "female",
        playbackRate: 1,
        pitch: 1,
      },
      [LULLABY_ID]: {
        name: formatMessage({
          id: "text2speech.lullaby",
          default: "Lullaby",
          description:
            "Female voice with standard pitch and high playback rate.",
        }),
        gender: "female",
        playbackRate: 1.3,
        pitch: 1,
      },
      [AURORA_ID]: {
        name: formatMessage({
          id: "text2speech.aurora",
          default: "Aurora",
          description: "Female voice with high pitch and low playback rate.",
        }),
        gender: "female",
        playbackRate: 0.7,
        pitch: 1.3,
      },
      [RADIANCE_ID]: {
        name: formatMessage({
          id: "text2speech.radiance",
          default: "Radiance",
          description: "High-pitched female voice.",
        }),
        gender: "female",
        playbackRate: 1,
        pitch: 1.3,
      },
      [FLASH_ID]: {
        name: formatMessage({
          id: "text2speech.flash",
          default: "Flash",
          description: "Female voice with high pitch and playback rate.",
        }),
        gender: "female",
        playbackRate: 1.3,
        pitch: 1.3,
      },
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
          blockIconURI: martyBlockIconURI,
          colour: "#5ba591",
          colourSecondary: "#498474",
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
    const state = this._getState(util.target);

    let speed = args.SPEED;

    // Only set the voice if the arg is a valid speed in the range of 0.001 = 2
    if (speed >= 0.1 && speed <= 2) {
      state.voiceSpeed = speed;
    } else {
      mv2Interface.send_REST(
        "notification/warn-message/Speed must be between 0.1 and 2"
      );
    }
  }

  /**
   * Convert the provided text into a sound file and then play the file.
   * @param  {object} args Block arguments
   * @param {object} util Utility object provided by the runtime.
   * @return {Promise} A promise that resolves after playing the sound
   */
  marty_speakAndWait(args, util) {
    return this.speakHelper(args, util, true);
  }

  speakHelper(args, util, isMartyBlock) {
    return new Promise((resolve, reject) => {
      // Cast input to string
      let words = Cast.toString(args.WORDS);
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
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(
              `HTTP ${res.status} error reaching translation service`
            );
          }

          return res.arrayBuffer();
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
          gainNode.gain.value = window.volume || (util.target.volume / 100) * 2;
          console.log("window.volume", window.volume);
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
              if (isMartyBlock) {
                if (mv2Interface.isConnected) {
                  mv2Interface.streamAudio(mp3SoundData, maxDuration * 1000);
                } else {
                  window.vm.runtime.stopAll();
                  return mv2Interface.send_REST(
                    "notification/warn-message/You are not currently connected to a Marty. Please connect."
                  );
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
              return mv2Interface.send_REST(
                "notification/warn-message/Text to speech extension requires internet connection."
              );
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
    return this.speakHelper(args, util, false);
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

module.exports = Scratch3Text2SpeechBlocks;
