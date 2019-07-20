"use strict";
$(document).ready(function () {
    const $panels = $(".card");
    const navBarLinks = new Set();
    $panels.each(function (k, v) {
        navBarLinks.add($(v).data("type"));
        $(v).find(".card-header").attr("id", `heading${k}`).find("a").attr({
            "href": `#collapse${k}`,
            "aria-controls": `collapse${k}`
        });
        $(v).find(".panel-collapse").attr({
            "id": `collapse${k}`,
            "aria-labelledby": `heading${k}`
        });
    });
    navBarLinks.forEach(navBarLink => {
        $("#navbar").append($("<li></li>", {
            "class": "nav-item"
        }).append($("<a></a>", {
            "class": "nav-link",
            "href": "#!",
            "data-target": navBarLink
        }).text(navBarLink)));
    });
    $("#accordion").html(
        $panels.sort((a, b) => $(a).find(".mb-0").text().trim().toUpperCase().charCodeAt(0) - $(b).find(".mb-0").text().trim().toUpperCase().charCodeAt(0)));
    $panels.each(function () {
        const type = $(this).data("type");
        $(this).find("h5").append($("<small></small>", {
            "text": type,
            "class": "float-right pr-3"
        }));
    });
    $(".nav-link").on("click", function (event) {
        event.preventDefault();
        var target = $(this).data("target");
        $(".panel-collapse.in").collapse("hide");
        location.hash = encodeURIComponent(target);
        if (target === "All") {
            $(".card").slideDown();
            $("#visible").text($(".card").length);
        } else {
            $(".card").each((k, v) => ($(v).data("type") === target) ? $(v).slideDown() : $(v).slideUp());
            setTimeout(() => $("#visible").text($(".card:visible").length), 500);
        }
        $(".nav-link").each((k, v) => {
            $(v).data("target") === target
                ? $(v).parent().addClass("active")
                : $(v).parent().removeClass("active");
        });
    });
    $("#visible").text($(".card:visible").length);
    window.location.hash && $(".nav-link[data-target='" + decodeURIComponent(window.location.hash).substring(1) + "']").trigger("click");
});