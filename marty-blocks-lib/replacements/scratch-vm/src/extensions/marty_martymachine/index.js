const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const MathUtil = require('../../util/math-util');
const log = require('../../util/log');
const formatMessage = require('format-message');
const menuIconURI =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgaWQ9InN2ZzM5NSIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgNDAgNDAiCiAgIGhlaWdodD0iNDBweCIKICAgd2lkdGg9IjQwcHgiPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTM5OSI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+bWljcm9iaXQtYmxvY2staWNvbjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTAuMiAoNTUwNDcpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogIDx0aXRsZQogICAgIGlkPSJ0aXRsZTIiPm1pY3JvYml0LWJsb2NrLWljb248L3RpdGxlPgogIDxkZXNjCiAgICAgaWQ9ImRlc2M0Ij5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICA8ZGVmcwogICAgIGlkPSJkZWZzNiIgLz4KICA8cGF0aAogICAgIHN0eWxlPSJvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6IzdmZGRjNjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC4wNTI2NDk2NDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7bWFya2VyOm5vbmU7cGFpbnQtb3JkZXI6c3Ryb2tlIGZpbGwgbWFya2VycyIKICAgICBkPSJNIDM5LjA4MTA5MSwyMCBBIDE5LjA4MTA5MSwxOS4wODEwOTEgMCAwIDEgMjAsMzkuMDgxMDkyIDE5LjA4MTA5MSwxOS4wODEwOTEgMCAwIDEgMC45MTg5MDk0NywyMCAxOS4wODEwOTEsMTkuMDgxMDkxIDAgMCAxIDIwLDAuOTE4OTA4NjUgMTkuMDgxMDkxLDE5LjA4MTA5MSAwIDAgMSAzOS4wODEwOTEsMjAgWiIKICAgICBpZD0icGF0aDg3MSIgLz4KICA8ZwogICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuMTYwNTE1MTEsMCwwLDAuMTYwNTE1MTEsMy4xMjExOTY1LC0wLjg4NzE3NDUxKSIKICAgICBpZD0iZzE0OTEiPgogICAgPGcKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDEuNTA2MDMzLDAsMCwxLjUwNjAzMywtNTMuMDY1MzYsLTc1LjIxNTk4NSkiCiAgICAgICBpZD0iZzEzMDUtOSI+CiAgICAgIDxnCiAgICAgICAgIGlkPSJnMTI2MC05Ij4KICAgICAgICA8cGF0aAogICAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6I2ZmZDQyYTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC40OTk4Njg0NTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgICAgZD0ibSAxNTguMTYwMDgsMTE0LjMwNzkxIGMgNC41NjQwNiwtMS4zODUxNiA0LjU1NDUzLDQuOTQ5MDIgNC41NDUxMiw3LjkwNjk3IDAuNDYyMDIsNy45OTgxMiAwLjAzNTEsMTYuMDcyODEgLTEuMDA3NDYsMjMuOTkxOTQgLTIuMjg2MDksNS4xNzA4IC02LjA0MDgsLTAuNDA3NzIgLTQuMjQ0MDgsLTMuODUzNTYgMC4xNDk2OSwtOS4zMzUwNCAwLjQ4NjUsLTE4LjY5ODMxIDAuNzA2NDIsLTI4LjA0NTM1IHoiCiAgICAgICAgICAgaWQ9InBhdGgxMjU0LTEiIC8+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBzdHlsZT0ib3BhY2l0eToxO3ZlY3Rvci1lZmZlY3Q6bm9uZTtmaWxsOiNmZmQ0MmE7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuNTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgICAgZD0ibSAxNTQuNDUwNTIsMTc1LjIwODc4IGMgMi42MDk2NCwyLjU4MDEgNi41NTQ4OCwwLjI1MjkxIDYuMzE4NzgsLTMuMTc0OTggMS4yMzE4NCwtNi4wODIxOSAxLjMzMzgyLC0xMi4zMzUwMSAxLjE5NTE5LC0xOC41MjM1NSAwLjUzODkyLC0zLjIwMDE5IC0xLjk1OTg5LC04LjQxMTM1IC01LjQ2MjU4LC00Ljk5MDQyIC0wLjk5MzQ4LDMuOTU5NTkgLTAuMzQ4ODYsOC41ODY5NSAtMS4wOTYxOCwxMi44MTQyNyAtMC4yNjUwNCw0LjYyNzk3IC0wLjY0NDE2LDkuMjQ5NDIgLTAuOTU1MjEsMTMuODc0NjggeiIKICAgICAgICAgICBpZD0icGF0aDEyNTYtNCIgLz4KICAgICAgPC9nPgogICAgICA8ZwogICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgtMSwwLDAsMSwyMTAuMTEzOTUsMC4xMjY5MzIwMSkiCiAgICAgICAgIGlkPSJnMTI2MC0wLTkiPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgc3R5bGU9ImZpbGw6I2ZmZDQyYTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC41O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgICAgZD0ibSAxNTguMTYwMDgsMTE0LjMwNzkxIGMgNi4yNzY0NiwtMC4yNTE5MSA0LjExNzEsOC4xNDE4OSA0LjcwOTA1LDEyLjIwMDk2IDAuMTI1NDQsNi41ODM3IC0wLjMxMjk1LDEzLjE3MTUxIC0xLjE3MTM4LDE5LjY5Nzk1IC0zLjM0NTk0LDUuNDk0MjYgLTYuMjMyODcsLTMuNTM3MjMgLTQuMTk4MzIsLTYuNDI3MjIgMC4xNjUwNywtOC40OTE5MyAwLjQ2MDkyLC0xNi45ODA2IDAuNjYwNjUsLTI1LjQ3MTY5IHoiCiAgICAgICAgICAgaWQ9InBhdGgxMjU0LTktMSIgLz4KICAgICAgICA8cGF0aAogICAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6I2ZmZDQyYTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC41O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICBkPSJtIDE1NC4yNDAwNSwxNzUuNDE5MjYgYyAxLjUyNzUxLDEuNDgyMjQgNC4xMTEyMiwxLjA2Njg0IDUuNDA4MjMsLTAuNTA5MzEgMS4zMTkyNSwtMS4zNzY3OSAxLjk2NjQyLC0zLjM4NTUxIDEuNjQxNzksLTUuMjcwNjEgMC42MTQyMSwtNi43MjY1MyAxLjE4NzE5LC0xMy41MzI5NyAwLjI3MjYxLC0yMC4yNjA1NyAtMC44MDM5OSwtMS44MTkwMyAtMy40Mjk3MSwtMi4xOTMwMyAtNC43NjMzMSwtMC43MzY0NSAtMS45Mzc3NCwxLjY4MjQ5IC0wLjUwMTc3LDQuMTg0NDggLTAuOTc4NTQsNi4zMDg3OSAtMC4zODQ5Nyw2LjgzMzI1IC0xLjEzNTIsMTMuNjM5MjUgLTEuNTgwNzgsMjAuNDY4MTUgeiIKICAgICAgICAgICBpZD0icGF0aDEyNTYtMy0wIiAvPgogICAgICA8L2c+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6IzViY2JmNTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC40MzAwMzg5cHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJtIDEwNC40NzU3MywxMDMuNjgwNDkgYyAxOC4yOTI3NCwwLjAyNDQgNTQuODgyOCwtMy4zMjgzNCA1NC40NjE4NSw3LjYzMTIzIC0wLjQyMDk1LDEwLjk1OTU2IC0xLjUwNTUzLDU5LjQ0NTY2IC0xLjU4OTM3LDYxLjI3NjY4IC0wLjA4MzgsMS44MzEwMiAtMC4wNDI5LDMuMzY1MTkgLTEuNzM2NCwzLjQ5MDM2IC0xLjY5MzQ2LDAuMTI1MTcgLTk1Ljc0MjMwNywwLjAxNDUgLTk5LjMxMzk3OSwwLjIzMjQ4IC0zLjU3MTY3MiwwLjIxODAyIC0zLjcwNDE4NCwtMS45OTMzNCAtMy44NTI3NzksLTMuMzg5NzYgLTAuMTQ4NTk1LC0xLjM5NjQyIC0wLjc5NTYzOCwtNTUuODkyOTQgLTAuNjA5NDE1LC02My4wNzUzNCAwLjIxOTA0OSwtOC40NDg0NiAzNC4zNDczNTksLTYuMTkwMDUgNTIuNjQwMDkzLC02LjE2NTY1IHoiCiAgICAgICAgIGlkPSJyZWN0MTIzNi03IiAvPgogICAgICA8cGF0aAogICAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjU7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgZD0ibSAxMDQuNzkxNTQsMTUwLjIwNTg2IDYuNzg0OCwzLjkxNzIxIHYgNy40MjY4IGwgLTYuNzAwNzQsMy44Njg2OCAtNi41ODk5ODYsLTMuODA0NzMgdiAtNy43NTM0IHoiCiAgICAgICAgIGlkPSJwYXRoMTE3Ni01IiAvPgogICAgPC9nPgogICAgPGcKICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02LjY3OTg2ODIsLTIuNzUwNTM0KSIKICAgICAgIGlkPSJnMTMzNiI+CiAgICAgIDxnCiAgICAgICAgIGlkPSJnMTMyNCIKICAgICAgICAgdHJhbnNmb3JtPSJyb3RhdGUoMTQuODY0NDkzLDcyLjQwMzI5OCwxNDQuNTQ4MTkpIj4KICAgICAgICA8cGF0aAogICAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC43NTE1MzUzO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICBkPSJtIDcwLjE1MDk1Nyw4Mi4xMDY2NyBjIC04Ljk1NTUzNSwtMC4wMTgzNCAtMTcuODA2NDg2LDMuNzM2NjE4IC0yNC4wODg4MywxMC4xMDYwNzUgLTMuMzA5MjM3LC0yLjk2MDkyOSAtNi40OTAxMTksLTYuMDg5MTQ5IC0xMC4wMjIxODgsLTguNzg0ODYxIC0yLjY2NzQwNCwtMC4xOTk0NDMgLTcuNzY5MDA2LDIuNzg0MjczIC0zLjM5ODA2MSw0LjQ4NTIwNyAzLjU4MjIyNywyLjUyMTIyMSA2Ljg1NTUzMSw1LjUxNDU4NiA5LjQxNjE4OSw5LjA4NTEgLTkuMjMwNzQzLDEyLjgxMTgzOSAtOC42NjQ0OTEsMzEuNTYwNjc5IDEuMjU1MTU3LDQzLjgxOTkxOSA3LjgwMDI2MiwxMC4xMjM5OSAyMS41MTYwNDMsMTUuMzA5MDkgMzQuMDI5MjgxLDEyLjQyODggQyA5MS40MDUzMzQsMTUwLjM3OTg2IDEwMi41MDI2OCwxMzcuOTAxMTMgMTA0LjUxOTUsMTIzLjgxMTkgMTA2LjkzMjYsMTA5LjM3NzYyIDk5Ljg4ODE2Myw5My43NDQyODQgODYuOTk2Mzg4LDg2LjU3NzU2OCA4MS44OTg1MDksODMuNjUwNjg0IDc2LjAzMjA3NCw4Mi4wNzcxNzkgNzAuMTUwOTU3LDgyLjEwNjY3IFoiCiAgICAgICAgICAgaWQ9InBhdGgxMDYzLTIiIC8+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjM5NzY4NzQxcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICBkPSJtIDMwLjUyMTQxLDg2LjI4MTI1MyBjIC0xLjI5MjMzNiwtMS4wMTQ5MTkgLTQuMzkwNzk2LC0zLjUyNDgwNiAtNS40MDk0OTcsLTQuNzE0ODc3IDEuMTE0MzkxLC0wLjc2MzUzIDM0LjgwODQ5LC0xNS42MzEwNzMgNDUuNDQ1MTQ3LC0yMS41NDk3NzkgMS4xMDE1MjQsMC45NTMyOTMgMi4xOTE0MiwyLjk1Mzg1IDMuMTAzNDQyLDQuOTA4ODI5IC05LjE3OTI5Nyw1Ljg4MjE0MiAtMzguNTgyMjg0LDE4LjA3MDk1NiAtMzcuNjIwMTk5LDE4LjUwMjcxMyAtMy41NTEyMDksMS44MzI4NiAtMi4zMzM3NzcsMS4wMjI0MTkgLTUuNTE4ODkzLDIuODUzMTE0IHoiCiAgICAgICAgICAgaWQ9InBhdGgxMDYzLTMiIC8+CiAgICAgIDwvZz4KICAgICAgPGcKICAgICAgICAgaWQ9ImcxMzI4IgogICAgICAgICB0cmFuc2Zvcm09InJvdGF0ZSgtMTYuOTE1MzY2LDE0My44NjA1NCw5Ni4wMTI4NzYpIj4KICAgICAgICA8cGF0aAogICAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC43NTE1MzUzO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICBkPSJtIDE3MS43NTU0OCw4MC41MjQ0OTQgYyAtMy4zOTU4MiwyLjkxNjkxIC02LjQxNjM3LDYuMjQ1MTIyIC05LjU3MzU4LDkuNDE0OTczIC0xMC41MjgzNSwtOC44NTIwMjYgLTI2LjUzNjExLC0xMC4wMzU3NzMgLTM4LjMyNjQxLC0zLjAxOTYwMSAtMTIuNDgxMzksNy4wMTk1NjUgLTE5LjcwMzM0LDIxLjg5OTk5NCAtMTcuODk3NzcsMzYuMDUxNTM0IDEuNDI2OTMsMTMuOTU4NzkgMTEuODUzMDUsMjYuNjY0OTkgMjUuNTY0MDEsMzAuMTA3NDUgMTIuNDU0NDgsMy40MzI1NCAyNi40NTM4MywtMS4xODg5OCAzNC43NTM1NCwtMTEuMDA0MjkgMTAuMjg4NjgsLTExLjU1NTYgMTEuOTY5NDEsLTI5Ljc5MDc5IDMuODM2ODUsLTQyLjk3NzU4NyAtMS4xNDE4MiwtMi42MTE3MDUgLTUuMTgxODUsLTQuNzcyNjExIC0xLjg1OTA3LC03LjM2MzA0OCAyLjI5MTEsLTMuNzIxMjE1IDYuMTY0MjIsLTUuOTIwNTI5IDkuMTE0MzIsLTkuMDA2NTc1IC0xLjY4NDUzLC0xLjA2OTA4NCAtMy45MjQ1MiwtMS4wMTI3NjUgLTUuNjExODksLTIuMjAyODU2IHoiCiAgICAgICAgICAgaWQ9InBhdGgxMDEyLTMiIC8+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjM5NzY4NzQxcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICBkPSJtIDE3Ny4zNjc3LDgyLjcyNzE0NiBjIDMuMTc3MjMsLTIuMTAyNDQ0IDQuMjQzNzcsLTQuMjUwNjc5IDQuMjQzNzcsLTQuMjUwNjc5IC0yLjg2NzIzLC0xLjUzNTk5MyAtMjYuOTA1MDgsLTEyLjU3NDczOSAtNDIuNjU2NDYsLTIwLjc3MDk5NyAtMS4yNzgwOSwwLjY5NDgyMiAtMy4xNTUzMyw0LjM0MTA0OCAtMy43Njg4OCw1LjI1MzA3OCAxMC45NjEzOCw3LjY2NTQ2NiAzNi4zNzIzNywxOC4xNjIxOTMgNDIuMTgxNTcsMTkuNzY4NTk4IHoiCiAgICAgICAgICAgaWQ9InBhdGgxMDYzLTUtNiIgLz4KICAgICAgPC9nPgogICAgPC9nPgogICAgPGcKICAgICAgIHN0eWxlPSJzdHJva2U6IzAwMDAwMDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMS41MDMwNzA2LDAsMCwxLjUwMzA3MDYsLTU1Ljc0MDE0MSwtNzUuMDg5NjU1KSIKICAgICAgIGlkPSJnMTE3NCI+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7dmVjdG9yLWVmZmVjdDpub25lO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC4xNTk3MDAzcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJtIDg5LjI2NTg0MSwxMjcuNDAzMjUgYSA1LjMyMzYxNCw1LjMyMzYxNCAwIDAgMSAtNS4zMjM2MSw1LjMyMzYxIDUuMzIzNjE0LDUuMzIzNjE0IDAgMCAxIC01LjMyMzYyLC01LjMyMzYxIDUuMzIzNjE0LDUuMzIzNjE0IDAgMCAxIDUuMzIzNjIsLTUuMzIzNjIgNS4zMjM2MTQsNS4zMjM2MTQgMCAwIDEgNS4zMjM2MSw1LjMyMzYyIHoiCiAgICAgICAgIGlkPSJwYXRoMTA0Ni03LTYtNiIgLz4KICAgIDwvZz4KICAgIDxwYXRoCiAgICAgICBpZD0icGF0aDEwNDYtNy01IgogICAgICAgZD0ibSAxNDkuMjEzNTgsMTE3LjQ0OTI0IGEgOC4wMDE3Njc4LDguMDAxNzY3OCAwIDAgMSAtOS4yMzMyMSw2LjU0MjQ5IDguMDAxNzY3OCw4LjAwMTc2NzggMCAwIDEgLTYuNTQyNSwtOS4yMzMyMSA4LjAwMTc2NzgsOC4wMDE3Njc4IDAgMCAxIDkuMjMzMjMsLTYuNTQyNSA4LjAwMTc2NzgsOC4wMDE3Njc4IDAgMCAxIDYuNTQyNDgsOS4yMzMyMiB6IgogICAgICAgc3R5bGU9Im9wYWNpdHk6MTt2ZWN0b3ItZWZmZWN0Om5vbmU7ZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjI0MDA0MDgycHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxIiAvPgogIDwvZz4KPC9zdmc+Cg==";

const path = require('path');

const Message = {
    load_marty_machine_model: {
        'en': 'Load Machine Learning model[MODEL_NAME]',
        'ja': 'Machine Learningモデルを読み込む[MODEL_NAME]',
        'ja-Hira': 'Machine Learningモデルをよみこむ[MODEL_NAME]',
        'ko': 'Machine Learning 모델 불러오기[MODEL_NAME]',
        'zh-cn': '加载Machine Learning模型[MODEL_NAME]',
        'zh-tw': '載入Machine Learning模型[MODEL_NAME]',
        'el': 'Φόρτωση μοντέλου Μηχανικής Μάθησης [MODEL_NAME]',
        'pl': 'Załaduj model uczenia maszynowego [MODEL_NAME]',
    },
    image_classification_model_url: {
        'ja': '画像分類モデルURL[URL]',
        'ja-Hira': 'がぞうぶんるいモデル[URL]',
        'en': 'image classification model URL [URL]',
        'ko': '이미지 분류 모델 URL [URL]',
        'zh-tw': '影像分類模型網址[URL]',
        'el': 'Διεύθυνση URL μοντέλου ταξινόμησης εικόνας [URL]',
        'pl': 'Adres URL modelu klasyfikacji obrazu [URL]'
    },
    image_classification_sample_model_url: {
        'ja': 'https://teachablemachine.withgoogle.com/models/0rX_3hoH/',
        'ja-Hira': 'https://teachablemachine.withgoogle.com/models/0rX_3hoH/',
        'en': ' ',
        'ko': ' ',
        'zh-tw': ' ',
        'el': ' ',
        'pl': ' '
    },
    sound_classification_model_url: {
        'ja': '音声分類モデルURL[URL]',
        'ja-Hira': 'おんせいぶんるいモデル[URL]',
        'en': 'sound classification model URL [URL]',
        'ko': '소리 분류 모델 URL [URL]',
        'zh-tw': '聲音分類模型網址[URL]',
        'el': 'Διεύθυνση URL μοντέλου ταξινόμησης ήχου [URL]',
        'pl': 'Adres URL modelu klasyfikacji dźwięku [URL]'
    },
    sound_classification_sample_model_url: {
        'ja': 'https://teachablemachine.withgoogle.com/models/xP0spGSB/',
        'ja-Hira': 'https://teachablemachine.withgoogle.com/models/xP0spGSB/',
        'en': ' ',
        'ko': ' ',
        'zh-tw': ' ',
        'el': ' ',
        'pl': ' '
    },
    classify_image: {
        'ja': '画像を分類する',
        'ja-Hira': 'がぞうをぶんるいする',
        'en': 'classify image',
        'ko': '이미지 분류하기',
        'zh-tw': '影像分類',
        'el': 'Ταξινόμηση εικόνας',
        'pl': 'Klasyfikuj obraz'
    },
    image_label: {
        'ja': '画像ラベル',
        'ja-Hira': 'がぞうラベル',
        'en': 'image label',
        'ko': '이미지 라벨',
        'zh-tw': '影像標籤',
        'el': 'Ετικέτα εικόνας',
        'pl': 'Etykieta obrazu'
    },
    sound_label: {
        'ja': '音声ラベル',
        'ja-Hira': 'おんせいラベル',
        'en': 'sound label',
        'ko': '소리 라벨',
        'zh-tw': '聲音標籤',
        'el': 'Ετικέτα ήχου',
        'pl': 'Etykieta dźwięku'
    },
    when_received_block: {
        'ja': '画像ラベル[LABEL]を受け取ったとき',
        'ja-Hira': 'がぞうラベル[LABEL]をうけとったとき',
        'en': 'when received image label:[LABEL]',
        'ko': '[LABEL] 이미지 라벨을 받았을 때:',
        'zh-cn': '接收到类别[LABEL]时',
        'zh-tw': '接收到影像標籤:[LABEL]時',
        'el': 'Όταν ληφθεί ετικέτα εικόνας: [LABEL]',
        'pl': 'Kiedy otrzymano etykietę obrazu: [LABEL]'
    },
    is_image_label_detected: {
        'ja': '[LABEL]の画像が見つかった',
        'ja-Hira': '[LABEL]のがぞうがみつかった',
        'en': 'image [LABEL] detected',
        'ko': '[LABEL] 이미지가 감지됨',
        'zh-tw': '影像[LABEL]被偵測？',
        'el': 'Εικόνα [LABEL] ανιχνεύθηκε',
        'pl': 'Wykryto obraz [LABEL]'
    },
    is_sound_label_detected: {
        'ja': '[LABEL]の音声が聞こえた',
        'ja-Hira': '[LABEL]のおんせいがきこえた',
        'en': 'sound [LABEL] detected',
        'ko': '[LABEL] 소리가 감지됨',
        'zh-tw': '聲音[LABEL]被偵測？',
        'el': '[LABEL] ήχου ανιχνεύθηκε',
        'pl': 'Wykryto dźwięk [LABEL]'
    },
    image_label_confidence: {
        'ja': '画像ラベル[LABEL]の確度',
        'ja-Hira': 'がぞうラベル[LABEL]のかくど',
        'en': 'confidence of image [LABEL]',
        'ko': '[LABEL] 이미지 신뢰도',
        'zh-tw': '影像置信度[LABEL]',
        'el': 'Εμπιστοσύνη της εικόνας [LABEL]',
        'pl': 'Pewność obrazu [LABEL]'
    },
    sound_label_confidence: {
        'ja': '音声ラベル[LABEL]の確度',
        'ja-Hira': 'おんせいラベル[LABEL]のかくど',
        'en': 'confidence of sound [LABEL]',
        'ko': '[LABEL] 소리 신뢰도',
        'zh-tw': '聲音置信度[LABEL]',
        'el': 'Εμπιστοσύνη του ήχου [LABEL]',
        'pl': 'Pewność dźwięku [LABEL]'
    },
    when_received_sound_label_block: {
        'ja': '音声ラベル[LABEL]を受け取ったとき',
        'ja-Hira': '音声ラベル[LABEL]をうけとったとき',
        'en': 'when received sound label:[LABEL]',
        'zh-cn': '接收到声音类别[LABEL]时',
        'ko': '[LABEL] 소리 라벨을 받았을 때:',
        'zh-tw': '接收到聲音標籤[LABEL]時',
        'el': 'Όταν ληφθεί ετικέτα ήχου: [LABEL]',
        'pl': 'Kiedy otrzymano etykietę dźwięku: [LABEL]'
    },
    label_block: {
        'ja': 'ラベル',
        'ja-Hira': 'ラベル',
        'en': 'label',
        'zh-cn': '标签',
        'ko': '라벨',
        'zh-tw': '標籤',
        'el': 'Ετικέτα',
        'pl': 'Etykieta'
    },
    any: {
        'ja': 'のどれか',
        'ja-Hira': 'のどれか',
        'en': 'any',
        'zh-cn': '任何',
        'ko': '어떤',
        'zh-tw': '任何',
        'el': 'Οποιοδήποτε',
        'pl': 'dowolny'
    },
    any_without_of: {
        'ja': 'どれか',
        'ja-Hira': 'どれか',
        'en': 'any',
        'ko': '어떤',
        'zh-cn': '任何',
        'zh-tw': '任何',
        'el': 'Οποιοδήποτε',
        'pl': 'dowolny'
    },
    all: {
        'ja': 'の全て',
        'ja-Hira': 'のすべて',
        'en': 'all',
        'ko': '모든',
        'zh-cn': '所有',
        'zh-tw': '全部',
        'el': 'Όλα',
        'pl': 'wszystkie'
    },
    toggle_classification: {
        'ja': 'ラベル付けを[CLASSIFICATION_STATE]にする',
        'ja-Hira': 'ラベルづけを[CLASSIFICATION_STATE]にする',
        'en': 'turn classification [CLASSIFICATION_STATE]',
        'ko': '라벨 분류 [CLASSIFICATION_STATE]',
        'zh-cn': '[CLASSIFICATION_STATE]分类',
        'zh-tw': '[CLASSIFICATION_STATE]分類',
        'el': 'Ενεργοποίηση ταξινόμησης [CLASSIFICATION_STATE]',
        'pl': 'Przełącz klasyfikację [CLASSIFICATION_STATE]'
    },
    set_confidence_threshold: {
        'ja': '確度のしきい値を[CONFIDENCE_THRESHOLD]にする',
        'ja-Hira': 'かくどのしきいちを[CONFIDENCE_THRESHOLD]にする',
        'en': 'set confidence threshold [CONFIDENCE_THRESHOLD]',
        'ko': '신뢰도 기준 설정 [CONFIDENCE_THRESHOLD]',
        'zh-tw': '設定置信度閾值[CONFIDENCE_THRESHOLD]',
        'el': 'Ορισμός ορίου εμπιστοσύνης [CONFIDENCE_THRESHOLD]',
        'pl': 'Ustaw próg pewności [CONFIDENCE_THRESHOLD]'
    },
    get_confidence_threshold: {
        'ja': '確度のしきい値',
        'ja-Hira': 'かくどのしきいち',
        'en': 'confidence threshold',
        'ko': '신뢰도 기준',
        'zh-tw': '置信度閾值',
        'el': 'Όριο εμπιστοσύνης',
        'pl': 'Próg pewności'
    },
    set_classification_interval: {
        'ja': 'ラベル付けを[CLASSIFICATION_INTERVAL]秒間に1回行う',
        'ja-Hira': 'ラベルづけを[CLASSIFICATION_INTERVAL]びょうかんに1かいおこなう',
        'en': 'Label once every [CLASSIFICATION_INTERVAL] seconds',
        'zh-cn': '每隔[CLASSIFICATION_INTERVAL]秒标记一次',
        'ko': '매 [CLASSIFICATION_INTERVAL]초마다 라벨 분류하기',
        'zh-tw': '每隔[CLASSIFICATION_INTERVAL]秒標記一次',
        'el': 'Ετικέτα κάθε [CLASSIFICATION_INTERVAL] δευτερόλεπτα',
        'pl': 'Etykietuj raz na [CLASSIFICATION_INTERVAL] sekund'
    },
    video_toggle: {
        'ja': 'ビデオを[VIDEO_STATE]にする',
        'ja-Hira': 'ビデオを[VIDEO_STATE]にする',
        'en': 'turn video [VIDEO_STATE]',
        'zh-cn': '[VIDEO_STATE]摄像头',
        'ko': '비디오 화면 [VIDEO_STATE]',
        'zh-tw': '視訊設為[VIDEO_STATE]',
        'el': 'Ενεργοποίηση βίντεο [VIDEO_STATE]',
        'pl': 'Przełącz wideo [VIDEO_STATE]'
    },
    on: {
        'ja': '入',
        'ja-Hira': 'いり',
        'en': 'on',
        'ko': '켜기',
        'zh-cn': '开启',
        'zh-tw': '開啟',
        'el': 'Ενεργοποίηση',
        'pl': 'włącz'
    },
    off: {
        'ja': '切',
        'ja-Hira': 'きり',
        'en': 'off',
        'ko': '멈추기',
        'zh-cn': '关闭',
        'zh-tw': '關閉',
        'el': 'Απενεργοποίηση',
        'pl': 'wyłącz'
    },
    video_on_flipped: {
        'ja': '左右反転',
        'ja-Hira': 'さゆうはんてん',
        'en': 'on flipped',
        'ko': '좌우 뒤집기',
        'zh-cn': '镜像开启',
        'zh-tw': '翻轉',
        'el': 'Αναστροφή',
        'pl': 'włączony odwrócony'
    },
    clear_model: {
        'ja': 'モデルをクリアする',
        'ja-Hira': 'モデルをクリアする',
        'en': 'clear model',
        'ko': '모델 지우기',
        'zh-cn': '清除模型',
        'zh-tw': '清除模型',
        'el': 'Καθαρισμός μοντέλου',
        'pl': 'wyczyść model'
    }
};

const AvailableLocales = ['en', 'ja', 'ja-Hira', 'ko', 'zh-cn', 'zh-tw', 'el', 'pl'];

class MartyMachineBlocks {
    constructor(runtime) {
        this.runtime = runtime;
        this.locale = this.setLocale();

        this.video = document.createElement('video');
        this.video.autoplay = true;

        this.interval = 1000;
        this.minInterval = 50;

        // this.timer = setInterval(() => {
        //     this.classifyVideoImage();
        // }, this.minInterval);

        this.imageModelUrl = null;
        this.imageMetadata = null;
        this.imageClassifier = null;
        this.initImageProbableLabels();
        this.confidenceThreshold = 0.5;

        this.soundModelUrl = null;
        this.soundMetadata = null;
        this.soundClassifier = null;
        this.soundClassifierEnabled = false;
        this.imageClassifierEnabled = false;
        this.initSoundProbableLabels();

        // this.runtime.ioDevices.video.enableVideo();

        let script = document.createElement('script');
        script.src = 'https://stretch3.github.io/ml5-library/ml5.min.js';
        document.head.appendChild(script);
    }

    recordAudioFrameWrapper() {
        if (!this.soundClassifierEnabled) {
            return;
        }
        this.classifyAudio();
    }

    recordFrameWrapper() {
        let lastCaptureTime = 0;
        const recordFrame = (timestamp) => {
            if (!lastCaptureTime || timestamp - lastCaptureTime >= this.interval) {
                if (!this.imageClassifierEnabled) {
                    return;
                }
                this.classifyVideoImage();
                lastCaptureTime = timestamp;
            }
            requestAnimationFrame(recordFrame);
        };

        requestAnimationFrame(recordFrame);
    }

    /**
     * Initialize the result of image classification.
     */
    initImageProbableLabels() {
        this.imageProbableLabels = [];
    }

    initSoundProbableLabels() {
        this.soundProbableLabels = [];
    }

    getInfo() {
        this.locale = this.setLocale();

        return {
            id: 'martymachine',
            name: 'ML',
            menuIconURI: menuIconURI,
            blocks: [
                {
                    opcode: 'loadImageModel',
                    text: Message.load_marty_machine_model[this.locale],
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        MODEL_NAME: {
                            type: ArgumentType.STRING,
                            menu: 'image_model_menu',
                            defaultValue: Message.image_classification_sample_model_url[this.locale]
                        }
                    }
                },
                {
                    opcode: 'whenReceived',
                    text: Message.when_received_block[this.locale],
                    blockType: BlockType.HAT,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        LABEL: {
                            type: ArgumentType.STRING,
                            menu: 'received_menu',
                            defaultValue: Message.any[this.locale]
                        }
                    }
                },
                {
                    opcode: 'isImageLabelDetected',
                    text: Message.is_image_label_detected[this.locale],
                    blockType: BlockType.BOOLEAN,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        LABEL: {
                            type: ArgumentType.STRING,
                            menu: 'image_labels_menu',
                            defaultValue: Message.any_without_of[this.locale]
                        }
                    }
                },
                {
                    opcode: 'imageLabelConfidence',
                    text: Message.image_label_confidence[this.locale],
                    blockType: BlockType.REPORTER,
                    disableMonitor: true,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        LABEL: {
                            type: ArgumentType.STRING,
                            menu: 'image_labels_without_any_menu',
                            defaultValue: ''
                        }
                    }
                },
                // {
                //     opcode: 'setImageClassificationModelURL',
                //     text: Message.image_classification_model_url[this.locale],
                //     blockType: BlockType.COMMAND,
                //     colour: "#5ba591",
                //     colourSecondary: "#5ba591",
                //     arguments: {
                //         URL: {
                //             type: ArgumentType.STRING,
                //             defaultValue: Message.image_classification_sample_model_url[this.locale]
                //         }
                //     }
                // },
                {
                    opcode: 'classifyVideoImageBlock',
                    text: Message.classify_image[this.locale],
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'getImageLabel',
                    text: Message.image_label[this.locale],
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    blockType: BlockType.REPORTER
                },
                '---',
                {
                    opcode: 'whenReceivedSoundLabel',
                    text: Message.when_received_sound_label_block[this.locale],
                    blockType: BlockType.HAT,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        LABEL: {
                            type: ArgumentType.STRING,
                            menu: 'received_sound_label_menu',
                            defaultValue: Message.any[this.locale]
                        }
                    }
                },
                {
                    opcode: 'isSoundLabelDetected',
                    text: Message.is_sound_label_detected[this.locale],
                    blockType: BlockType.BOOLEAN,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        LABEL: {
                            type: ArgumentType.STRING,
                            menu: 'sound_labels_menu',
                            defaultValue: Message.any_without_of[this.locale]
                        }
                    }
                },
                {
                    opcode: 'soundLabelConfidence',
                    text: Message.sound_label_confidence[this.locale],
                    blockType: BlockType.REPORTER,
                    disableMonitor: true,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        LABEL: {
                            type: ArgumentType.STRING,
                            menu: 'sound_labels_without_any_menu',
                            defaultValue: ''
                        }
                    }
                },
                // {
                //     opcode: 'setSoundClassificationModelURL',
                //     text: Message.sound_classification_model_url[this.locale],
                //     blockType: BlockType.COMMAND,
                //     colour: "#5ba591",
                //     colourSecondary: "#5ba591",
                //     arguments: {
                //         URL: {
                //             type: ArgumentType.STRING,
                //             defaultValue: Message.sound_classification_sample_model_url[this.locale]
                //         }
                //     }
                // },
                {
                    opcode: 'getSoundLabel',
                    text: Message.sound_label[this.locale],
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    blockType: BlockType.REPORTER
                },
                '---',
                {
                    opcode: 'toggleClassification',
                    text: Message.toggle_classification[this.locale],
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        CLASSIFICATION_STATE: {
                            type: ArgumentType.STRING,
                            menu: 'classification_menu',
                            defaultValue: 'off'
                        }
                    }
                },
                {
                    opcode: 'setClassificationInterval',
                    text: Message.set_classification_interval[this.locale],
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        CLASSIFICATION_INTERVAL: {
                            type: ArgumentType.STRING,
                            menu: 'classification_interval_menu',
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'setConfidenceThreshold',
                    text: Message.set_confidence_threshold[this.locale],
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        CONFIDENCE_THRESHOLD: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0.5
                        }
                    }
                },
                {
                    opcode: 'getConfidenceThreshold',
                    text: Message.get_confidence_threshold[this.locale],
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    disableMonitor: true
                },
                {
                    opcode: 'videoToggle',
                    text: Message.video_toggle[this.locale],
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        VIDEO_STATE: {
                            type: ArgumentType.STRING,
                            menu: 'video_menu',
                            defaultValue: 'off'
                        }
                    }
                },
                {
                    opcode: 'clearModel',
                    text: Message.clear_model[this.locale],
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591"
                }
            ],
            menus: {
                image_model_menu: {
                    acceptReporters: true,
                    items: 'getModelMenu',
                },
                received_menu: {
                    acceptReporters: true,
                    items: 'getLabelsMenu'
                },
                image_labels_menu: {
                    acceptReporters: true,
                    items: 'getLabelsWithAnyWithoutOfMenu'
                },
                image_labels_without_any_menu: {
                    acceptReporters: true,
                    items: 'getLabelsWithoutAnyMenu'
                },
                received_sound_label_menu: {
                    acceptReporters: true,
                    items: 'getSoundLabelsWithoutBackgroundMenu'
                },
                sound_labels_menu: {
                    acceptReporters: true,
                    items: 'getSoundLabelsWithoutBackgroundWithAnyWithoutOfMenu'
                },
                sound_labels_without_any_menu: {
                    acceptReporters: true,
                    items: 'getSoundLabelsWithoutAnyMenu'
                },
                video_menu: this.getVideoMenu(),
                classification_interval_menu: this.getClassificationIntervalMenu(),
                classification_menu: this.getClassificationMenu()
            }
        };
    }


    /**
     * Return the currently stored marty machine models
     * @return {Array} - Menu items with 'any'.
     */
    getModelMenu() {
        const menu = [
            ""
        ];
        const editingTarget = vm.runtime.getEditingTarget();
        const models = editingTarget?.sprite?.models || [];
        for (let i = 0; i < models.length; i++) {
            menu.push(models[i].name);
        }
        return menu;
    }

    /**
     * Load a marty machine model from the model name.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     */
    loadImageModel(args, util) {
        const model = util.target.sprite.models.find(model => model.name === args.MODEL_NAME);
        if (!model) return;
        // mv2Interface.startAndSetActiveAndEndMLSession();
        this.model = model;
        if (model?.modelType === "image-device") {
            // this.runtime.ioDevices.video.enableVideo();
            const media = navigator.mediaDevices.getUserMedia({
                video: {
                    width: martyMachine.image_size,
                    height: martyMachine.image_size,
                },
                audio: false
            });

            media.then(stream => {
                this.video.srcObject = stream;
            });

            this.imageMetadata = this.createImageModelMetadataFromModelDependencies(model.name, model.dependencies);
            this.imageModelUrl = null;
            this.imageClassifier = new ImageClassifier(model);
            log.info(`Loaded image model: ${model.name}`);
            this.toggleClassification({ CLASSIFICATION_STATE: 'on' });
            return `"${model.name}" Loaded!`;
        } else if (model?.modelType === "audio") {
            this.soundMetadata = this.createAudioModelMetadataFromModelDependencies(model.name, model.dependencies);
            this.soundModelUrl = null;
            this.soundClassifier = new SoundClassifier(model);
            log.info(`Loaded sound model: ${model.name}`);
            this.toggleClassification({ CLASSIFICATION_STATE: 'on' });
            return `"${model.name}" Loaded!`;
        }
    }

    /**
     * Detect change of the selected image label is the most probable one or not.
     * @param {object} args - The block's arguments.
     * @property {string} LABEL - The label to detect.
     * @return {boolean} - Whether the label is most probable or not.
     */
    whenReceived(args) {
        const label = this.getImageLabel();
        if (args.LABEL === Message.any[this.locale]) {
            return label !== '';
        }
        return label === args.LABEL;
    }

    /**
     * Detect change of the selected sound label is the most probable one or not.
     * @param {object} args - The block's arguments.
     * @property {string} LABEL - The label to detect.
     * @return {boolean} - Whether the label is most probable or not.
     */
    whenReceivedSoundLabel(args) {
        if (!this.soundClassifierEnabled) {
            return;
        }

        const label = this.getSoundLabel();
        if (args.LABEL === Message.any[this.locale]) {
            return label !== '';
        }
        return label === args.LABEL;
    }

    /**
     * Return whether the most probable image label is the selected one or not.
     * @param {object} args - The block's arguments.
     * @property {string} LABEL - The label to detect.
     * @return {boolean} - Whether the label is most probable or not.
     */
    isImageLabelDetected(args) {
        const label = this.getImageLabel();
        if (args.LABEL === Message.any[this.locale]) {
            return label !== '';
        }
        return label === args.LABEL;
    }

    /**
     * Return whether the most probable sound label is the selected one or not.
     * @param {object} args - The block's arguments.
     * @property {string} LABEL - The label to detect.
     * @return {boolean} - Whether the label is most probable or not.
     */
    isSoundLabelDetected(args) {
        const label = this.getSoundLabel();
        if (args.LABEL === Message.any[this.locale]) {
            return label !== '';
        }
        return label === args.LABEL;
    }

    /**
     * Return confidence of the image label.
     * @param {object} args - The block's arguments.
     * @property {string} LABEL - Selected label.
     * @return {number} - Confidence of the label.
     */
    imageLabelConfidence(args) {
        if (args.LABEL === '') {
            return 0;
        }
        const entry = this.imageProbableLabels.find(element => element.label === args.LABEL);
        return (entry ? entry.confidence : 0);
    }

    /**
     * Return confidence of the sound label.
     * @param {object} args - The block's arguments.
     * @property {string} LABEL - Selected label.
     * @return {number} - Confidence of the label.
     */
    soundLabelConfidence(args) {
        if (!this.soundProbableLabels || this.soundProbableLabels.length === 0) return 0;

        if (args.LABEL === '') {
            return 0;
        }
        const entry = this.soundProbableLabels.find(element => element.label === args.LABEL);
        return (entry ? entry.confidence : 0);
    }

    /**
     * Set a model for image classification from URL.
     * @param {object} args - the block's arguments.
     * @property {string} URL - URL of model to be loaded.
     * @return {Promise} - A Promise that resolve after loaded.
     */
    setImageClassificationModelURL(args) {
        return this.loadImageClassificationModelFromURL(args.URL);
    }

    /**
     * Set a model for sound classification from URL.
     * @param {object} args - the block's arguments.
     * @property {string} URL - URL of model to be loaded.
     * @return {Promise} - A Promise that resolve after loaded.
     */
    setSoundClassificationModelURL(args) {
        return this.loadSoundClassificationModelFromURL(args.URL);
    }

    /**
     * Load a model from URL for image classification.
     * @param {string} url - URL of model to be loaded.
     * @return {Promise} - A Promise that resolves after loaded.
     */
    loadImageClassificationModelFromURL(url) {
        return new Promise(resolve => {
            const modelId = path.basename(url);
            const storageUrl = `https://storage.googleapis.com/tm-model/${modelId}/`;
            const timestamp = new Date().getTime();
            fetch(`${storageUrl}metadata.json?${timestamp}`)
                .then(res => res.json())
                .then(metadata => {
                    if (url === this.imageModelUrl &&
                        (new Date(metadata.timeStamp).getTime() === new Date(this.imageMetadata.timeStamp).getTime())) {
                        log.info(`image model already loaded: ${url}`);
                    } else {
                        ml5.imageClassifier(`${storageUrl}model.json?${timestamp}`)
                            .then(classifier => {
                                this.imageModelUrl = url;
                                this.imageMetadata = metadata;
                                this.imageClassifier = classifier;
                                this.initImageProbableLabels();
                                log.info(`image model loaded from: ${url}`);
                            })
                            .catch(error => {
                                log.warn(error);
                            })
                            .finally(() => resolve());
                    }
                })
                .catch(error => {
                    log.warn(error);
                    resolve();
                });
        });
    }

    /**
     * Load a model from URL for sound classification.
     * @param {string} url - URL of model to be loaded.
     * @return {Promise} - A Promise that resolves after loaded.
     */
    loadSoundClassificationModelFromURL(url) {
        return new Promise(resolve => {
            fetch(`${url}metadata.json`)
                .then(res => res.json())
                .then(metadata => {
                    if (url === this.soundModelUrl &&
                        (new Date(metadata.timeStamp).getTime() === new Date(this.soundMetadata.timeStamp).getTime())) {
                        log.info(`sound model already loaded: ${url}`);
                        resolve();
                    } else {
                        ml5.soundClassifier(`${url}model.json`)
                            .then(classifier => {
                                this.soundModelUrl = url;
                                this.soundMetadata = metadata;
                                this.soundClassifier = classifier;
                                this.initSoundProbableLabels();
                                this.soundClassifierEnabled = true;
                                this.classifySound();
                                log.info(`sound model loaded from: ${url}`);
                            })
                            .catch(error => {
                                log.warn(error);
                            })
                            .finally(() => resolve());
                    }
                })
                .catch(error => {
                    log.warn(error);
                    resolve();
                });
        });
    }

    /**
     * Return menu items to detect label in the image.
     * @return {Array} - Menu items with 'any'.
     */
    getLabelsMenu() {
        let items = [Message.any[this.locale]];
        if (!this.imageMetadata) return items;
        items = items.concat(this.imageMetadata.labels);
        return items;
    }


    /**
     * Return menu items to detect label in the image.
     * @return {Array} - Menu items with 'any without of'.
     */
    getLabelsWithAnyWithoutOfMenu() {
        let items = [Message.any_without_of[this.locale]];
        if (!this.imageMetadata) return items;
        items = items.concat(this.imageMetadata.labels);
        return items;
    }

    /**
     * Return menu items to detect label in the image.
     * @return {Array} - Menu items with 'any'.
     */
    getSoundLabelsMenu() {
        let items = [Message.any[this.locale]];
        if (!this.soundMetadata) return items;
        items = items.concat(this.soundMetadata.wordLabels);
        return items;
    }

    /**
     * Return menu itmes to get properties of the image label.
     * @return {Array} - Menu items with ''.
     */
    getLabelsWithoutAnyMenu() {
        let items = [''];
        if (this.imageMetadata) {
            items = items.concat(this.imageMetadata.labels);
        }
        return items;
    }

    /**
     * Return menu itmes to get properties of the sound label.
     * @return {Array} - Menu items with ''.
     */
    getSoundLabelsWithoutAnyMenu() {
        if (this.soundMetadata) {
            return this.soundMetadata.wordLabels;
        } else {
            return [''];
        }
    }

    /**
     * Return menu itmes to get properties of the sound label.
     * @return {Array} - Menu items without '_background_noise_'.
     */
    getSoundLabelsWithoutBackgroundMenu() {
        let items = [Message.any[this.locale]];
        if (!this.soundMetadata) return items;
        let arr = this.soundMetadata.wordLabels;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== '_background_noise_') {
                items.push(arr[i]);
            }
        }
        return items;
    }

    /**
     * Return menu itmes to get properties of the sound label.
     * @return {Array} - Menu items without '_background_noise_' and with 'any without of'.
     */
    getSoundLabelsWithoutBackgroundWithAnyWithoutOfMenu() {
        let items = [Message.any_without_of[this.locale]];
        if (!this.soundMetadata) return items;
        let arr = this.soundMetadata.wordLabels;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== '_background_noise_') {
                items.push(arr[i]);
            }
        }
        return items;
    }

    /**
     * Pick a probability which has highest confidence.
     * @param {Array} probabilities - An Array of probabilities.
     * @property {number} probabilities.confidence - Probability of the label.
     * @return {object} - One of the highest confidence probability.
     */
    getMostProbableOne(probabilities) {
        if (probabilities.length === 0) return null;
        let mostOne = probabilities[0];
        probabilities.forEach(clss => {
            if (clss.confidence > mostOne.confidence) {
                mostOne = clss;
            }
        });
        return mostOne;
    }

    /**
     * Classify image from the video input.
     * Call stack will wait until the previous classification was done.
     *
     * @param {object} _args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @return {Promise} - a Promise that resolves after classification.
     */
    classifyVideoImageBlock(_args, util) {
        if (this._isImageClassifying) {
            if (util) util.yield();
            return;
        }
        return new Promise(resolve => {
            this.classifyImage(this.video)
                .then(result => {
                    resolve(JSON.stringify(result));
                });
        });
    }

    /**
     * Classyfy image from input data source.
     *
     * @param {HTMLImageElement | ImageData | HTMLCanvasElement | HTMLVideoElement} input
     *  - Data source for classification.
     * @return {Promise} - A Promise that resolves the result of classification.
     *  The result will be empty when the imageClassifier was not set.
     */
    classifyImage(input) {
        if (!this.imageMetadata || !this.imageClassifier) {
            this._isImageClassifying = false;
            return Promise.resolve([]);
        }
        this._isImageClassifying = true;
        return this.imageClassifier.classify(input)
            .then(result => {
                this.imageProbableLabels = result.slice();
                this.imageProbableLabelsUpdated = true;
                return result;
            })
            .finally(() => {
                setTimeout(() => {
                    // Initialize probabilities to reset whenReceived blocks.
                    this.initImageProbableLabels();
                    this._isImageClassifying = false;
                }, this.interval);
            });
    }

    /**
     * Classify sound.
     */
    classifySound() {
        this.soundClassifier.classify((predictions) => {
            if (this.soundClassifierEnabled && predictions) {
                const predictionIdx = predictions.predictionIdx;
                if (predictionIdx >= 0) {
                    const actualPredictions = predictions.output;
                    this.soundProbableLabels = actualPredictions.slice();
                }
                setTimeout(() => {
                    // Initialize probabilities to reset whenReceivedSoundLabel blocks.
                    this.initSoundProbableLabels();
                }, this.interval);
            }
        });
    }

    /**
     * Get the most probable label in the image.
     * Retrun the last classification result or '' when the first classification was not done.
     * @return {string} label
    */
    getImageLabel() {
        if (!this.imageProbableLabels || this.imageProbableLabels.length === 0) return '';
        const mostOne = this.getMostProbableOne(this.imageProbableLabels);
        return (mostOne.confidence >= this.confidenceThreshold) ? mostOne.label : '';
    }

    /**
     * Get the most probable label in the sound.
     * Retrun the last classification result or '' when the first classification was not done.
     * @return {string} label
    */
    getSoundLabel() {
        if (!this.soundProbableLabels || this.soundProbableLabels.length === 0) return '';
        const mostOne = this.getMostProbableOne(this.soundProbableLabels);
        return (mostOne.confidence >= this.confidenceThreshold) ? mostOne.label : '';
    }

    /**
     * Set confidence threshold which should be over for detected label.
     * @param {object} args - the block's arguments.
     * @property {number} CONFIDENCE_THRESHOLD - Value of confidence threshold.
     */
    setConfidenceThreshold(args) {
        let threshold = Cast.toNumber(args.CONFIDENCE_THRESHOLD);
        threshold = MathUtil.clamp(threshold, 0, 1);
        this.confidenceThreshold = threshold;
    }

    /**
     * Get confidence threshold which should be over for detected label.
     * @param {object} args - the block's arguments.
     * @return {number} - Value of confidence threshold.
     */
    getConfidenceThreshold() {
        return this.confidenceThreshold;
    }

    /**
     * Set state of the continuous classification.
     * @param {object} args - the block's arguments.
     * @property {string} CLASSIFICATION_STATE - State to be ['on'|'off'].
     */
    toggleClassification(args) {
        const state = args.CLASSIFICATION_STATE;
        this.soundClassifierEnabled = false;
        this.imageClassifierEnabled = false;
        if (state === 'on') {
            this.imageClassifierEnabled = true;
            this.soundClassifierEnabled = true;

            if (this.model?.modelType === "image-device") {
                this.recordFrameWrapper();
            } else if (this.model?.modelType === "audio") {
                this.recordAudioFrameWrapper();
            }
        }
    }

    /**
     * Set interval time of the continuous classification.
     * @param {object} args - the block's arguments.
     * @property {number} CLASSIFICATION_INTERVAL - Interval time (seconds).
     */
    setClassificationInterval(args) {
        this.interval = args.CLASSIFICATION_INTERVAL * 1000;
    }

    /**
     * Show video image on the stage or not.
     * @param {object} args - the block's arguments.
     * @property {string} VIDEO_STATE - Show or not ['on'|'off'].
     */
    videoToggle(args) {
        const state = args.VIDEO_STATE;
        if (state === 'off') {
            this.runtime.ioDevices.video.disableVideo();
        } else {
            this.runtime.ioDevices.video.enableVideo();
            this.runtime.ioDevices.video.mirror = state === 'on';
        }
    }

    /**
     * Clears the loaded model by essentially removing the video/sound stream
     */

    clearModel() {
        // remove all the streams of the video
        const stream = this.video.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }

        this.imageModelUrl = null;
        this.imageMetadata = null;
        this.imageClassifier = null;
        this.initImageProbableLabels();
        this.confidenceThreshold = 0.5;

        if (this.soundClassifier) {
            this.soundClassifier.stop();
        }

        this.soundModelUrl = null;
        this.soundMetadata = null;
        this.soundClassifier = null;
        this.soundClassifierEnabled = false;
        this.imageClassifierEnabled = false;
        this.initSoundProbableLabels();
    }

    /**
     * Classify video image.
     * @return {Promise} - A Promise that resolves the result of classification.
     *  The result will be empty when another classification was under going.
     */
    classifyVideoImage() {
        if (this._isImageClassifying) return Promise.resolve([]);
        return this.classifyImage(this.video);
    }

    /**
     * Classify audio stream.
     * @return {Promise} - A Promise that resolves the result of classification.
     * The result will be empty when another classification was under going.
     */
    classifyAudio() {
        if (this._isSoundClassifying) return Promise.resolve([]);
        return this.classifySound();
    }

    /**
     * Return menu for video showing state.
     * @return {Array} - Menu items.
     */
    getVideoMenu() {
        return [
            {
                text: Message.off[this.locale],
                value: 'off'
            },
            {
                text: Message.on[this.locale],
                value: 'on'
            },
            {
                text: Message.video_on_flipped[this.locale],
                value: 'on-flipped'
            }
        ];
    }

    /**
     * Return menu for classification interval setting.
     * @return {object} - Menu.
     */
    getClassificationIntervalMenu() {
        return {
            acceptReporters: true,
            items: [
                {
                    text: '1',
                    value: '1'
                },
                {
                    text: '0.5',
                    value: '0.5'
                },
                {
                    text: '0.2',
                    value: '0.2'
                },
                {
                    text: '0.1',
                    value: '0.1'
                }
            ]
        };
    }

    /**
     * Return menu for continuous classification state.
     * @return {Array} - Menu items.
     */
    getClassificationMenu() {
        return [
            {
                text: Message.off[this.locale],
                value: 'off'
            },
            {
                text: Message.on[this.locale],
                value: 'on'
            }
        ];
    }

    /**
     * Get locale for message text.
     * @return {string} - Locale of this editor.
     */
    setLocale() {
        const locale = formatMessage.setup().locale;
        if (AvailableLocales.includes(locale)) {
            return locale;
        }
        return 'en';

    }


    // HELPERS
    createImageModelMetadataFromModelDependencies(modelName, modelDependencies) {
        const modelClasses = modelDependencies[2]?.classes || [];
        return {
            imageSize: null,
            labels: modelClasses.map(clsObj => clsObj.name),
            modelName: modelName,
            packageName: null,
            packageVersion: null,
            timeStamp: new Date().toISOString(),
            tmVersion: null,
            getUserMetadata: {}
        }
    }

    createAudioModelMetadataFromModelDependencies(modelName, modelDependencies) {
        const modelClasses = modelDependencies[2]?.classes || [];
        return {
            wordLabels: modelClasses.map(clsObj => clsObj.name),
            modelName: modelName,
            packageName: null,
            packageVersion: null,
            timeStamp: new Date().toISOString(),
            tmVersion: null,
            getUserMetadata: {}
        }
    }
}

class ImageClassifier {
    constructor(model) {
        this.model = model;
    }

    async classify(videoElement) {
        const canvas = document.createElement('canvas');
        canvas.width = martyMachine.image_size;
        canvas.height = martyMachine.image_size;
        canvas.style.display = 'none';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        // let imageSrc = canvas.toDataURL('image/png');
        // imageSrc = imageSrc.replace(/^data:image\/(png|jpg);base64,/, "");
        const predictions = await this.model.MLModel.runModel(canvas);
        return predictions.output;
    }
}

class SoundClassifier {
    constructor(model) {
        this.model = model;
        this.audioExtractor = null;
        this.RECORD_TIME = 1200;
    }

    async classify(predictionCb = null) {
        console.log("Classifying sound...");
        const audioExtractor = new AudioExtractor(true, this.model);
        await audioExtractor.start();
        this.model.MLModel.runAudioModel();
        this.audioExtractor = audioExtractor;

        if (predictionCb) return this.model.MLModel.setPredictionCallback = predictionCb;
        return new Promise(async (resolve, reject) => {
            this.model.MLModel.setPredictionCallback = (predictions) => {
                const predictionIdx = predictions.predictionIdx;
                if (predictionIdx >= 0) {
                    const actualPredictions = predictions.output;
                    resolve(actualPredictions);
                } else {
                    reject();
                }
            };
        });
    }

    stop() {
        if (this.audioExtractor) {
            this.audioExtractor.stop();
        }
        this.model.MLModel.stopAudioModel();
    }
}



class AudioExtractor {
    constructor(shouldStreamToWebWorker = false, model = null) {
        const trainingOptions = new martyMachine.AudioTrainingOptions();
        this.sampleRateHz = trainingOptions.sampleRateHz;
        this.fftSize = trainingOptions.fftSize;
        this.columnTruncateLength = trainingOptions.columnTruncateLength;
        this.includeRawAudio = true;
        console.log(`sampleRateHz=${this.sampleRateHz}, fftSize=${this.fftSize}, frameDurationMillis=${this.frameDurationMillis}, columnTruncateLength=${this.columnTruncateLength}, includeRawAudio=${this.includeRawAudio}`)
        this.shouldStreamToWebWorker = shouldStreamToWebWorker;
        this.model = model;
    }

    async start() {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        this.audioContext = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;
        const streamSource = this.audioContext.createMediaStreamSource(this.stream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = this.fftSize * 2;
        this.analyser.smoothingTimeConstant = 0.0;
        streamSource.connect(this.analyser);

        // Reset the queue
        this.freqDataQueue = [];
        this.freqData = new Float32Array(this.fftSize);
        if (this.includeRawAudio) {
            this.timeDataQueue = [];
            this.timeData = new Float32Array(this.fftSize);
        }

        this.frameIntervalTask = setInterval(
            this.onAudioFrame.bind(this), this.fftSize / this.sampleRateHz * 1e3);
    }

    async onAudioFrame() {
        this.analyser.getFloatFrequencyData(this.freqData);
        if (this.freqData[0] === -Infinity) {
            return;
        }

        const freqDataSliced = this.freqData.slice(0, this.columnTruncateLength);
        this.freqDataQueue.push([...freqDataSliced]);
        // if (this.shouldStreamToWebWorker) {
        //     martyMachine.streamAudioToWebWorker(this.model, {freqData: [...freqDataSliced]});
        // }
        if (this.includeRawAudio) {
            this.analyser.getFloatTimeDomainData(this.timeData);
            this.timeDataQueue.push(this.timeData.slice());
            // if (this.shouldStreamToWebWorker) {
            //     martyMachine.streamAudioToWebWorker(this.model, {timeData: [...this.timeData]});
            // }
        }
        if (this.shouldStreamToWebWorker) {
            martyMachine.streamAudioToWebWorker(this.model.MLModel, { freqData: [...freqDataSliced], timeData: [...this.timeData] });
        }
    }

    async stop() {
        if (this.frameIntervalTask == null) {
            throw new Error(
                'Cannot stop because there is no ongoing streaming activity.');
        }
        clearInterval(this.frameIntervalTask);
        this.frameIntervalTask = null;
        this.analyser.disconnect();
        this.audioContext.close();
        if (this.stream != null && this.stream.getTracks().length > 0) {
            this.stream.getTracks()[0].stop();
        }
    }

}


module.exports = MartyMachineBlocks;