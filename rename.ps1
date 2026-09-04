$files = Get-ChildItem -Path 'src\pages\maison-stone' -Recurse -File -Filter *.tsx
foreach ($file in $files) {
    (Get-Content $file.FullName) -replace 'brand-obsidian', 'brand-ms-obsidian' -replace 'brand-graphite', 'brand-ms-graphite' -replace 'brand-bronze', 'brand-ms-bronze' -replace 'brand-bronzeGlow', 'brand-ms-bronzeGlow' -replace 'brand-alabaster', 'brand-ms-alabaster' -replace 'brand-linen', 'brand-ms-linen' -replace 'font-heading', 'font-ms-heading' -replace 'font-body', 'font-ms-body' | Set-Content $file.FullName
}
