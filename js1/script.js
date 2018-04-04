function generateTables() {
    for (var i = 1; i <= 10; i++) {
        var newTable = "<table><tr><th colspan=2>Produtos de " + i + "</th></tr>";
        for (var j = 1; j <= 10; j++) {
            newTable += "<tr>"
            newTable += "<td>"
            newTable += "" + i + "x" + j
            newTable += "</td>"
            newTable += "<td>"
            newTable += "" + (i * j)
            newTable += "</td>"
            newTable += "</tr>"
        }
        document.write(newTable)
    }

}

generateTables()