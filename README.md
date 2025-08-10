# Portfolio full-stack (Angular + Spring Boot)
@"
node_modules/
dist/
**/target/
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
**/.env
**/application-*.yml
"@ | Out-File -Encoding utf8 .gitignore

@"
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
"@ | Out-File -Encoding utf8 .editorconfig
