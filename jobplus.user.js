// ==UserScript==
// @name         JobPlus
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       kanzetu
// @include      https://banweb.cityu.edu.hk/pls/PROD/hwwjpostenq_cityu.main
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @grant    GM_xmlhttpRequest
// ==/UserScript==

waitForKeyElements (".body", f);

var current_row

function f(){
    var q1 = $(".body table tbody")
    var table
    q1.each(function(i, e){
        var temp = $(e).find("tr th")
        if ( temp.html() === "&nbsp;"){
            table = e
        }
    })
    var header = $(table).find("tr")
    header.each(function(i, e){
        current_row = $(e)
        if (i==0){
            $(e).html($(e).html() + "<th>Closing Date</th>")
            $(e).html($(e).html() + "<th>Vacancies</th>")
            $(e).html($(e).html() + "<th>Salary</th>")
            $(e).html($(e).html() + "<th>Description</th>")
            $(e).html($(e).html() + "<th>Requirement</th>")
        }else{
            var title = $(e).find("td").eq(2).find("a").eq(0).attr("href")
            var url = window.location.href + "?p_mode=" + title.split('"')[1] + "&p_rowid=" + encodeURIComponent(title.split('"')[3])
            console.log(url)
            GM_xmlhttpRequest ( {
                method:         "GET",
                url:            url,
                onload:        function(e) {
                                    return  function(rspObj) {
                                        if (rspObj.status != 200  &&  rspObj.status != 304) {
                                            return;
                                        }
                                        var pyLd =  rspObj.response;
                                        var close = $(pyLd).find("tbody tr").eq(12).find("td").eq(0).text()
                                        e.html(e.html() + "<td><small>" + close + "</small></td>")
                                        var vacancies = $(pyLd).find("tbody tr").eq(5).find("td").eq(0).text()
                                        e.html(e.html() + "<td><small>" + vacancies + "</small></td>")
                                        var salary = $(pyLd).find("tbody tr").eq(10).find("td").eq(0).text()
                                        e.html(e.html() + "<td><small>" + salary + "</small></td>")
                                        var Description = $(pyLd).find("tbody tr").eq(8).find("td").eq(0).html()
                                        e.html(e.html() + "<td><small>" + Description + "</small></td>")
                                        var Requirement = $(pyLd).find("tbody tr").eq(8).find("td").eq(0).html()
                                        e.html(e.html() + "<td><small>" + Requirement + "</small></td>")
                                        console.log(salary)
                                    }
                                }($(e))

            } );
        }
    })
    console.log(table)

}


