var smwAsync = smwAsync ? smwAsync : {};
(function () {
    var a = { type: false, id: 0, detail: false };
    var c = { type: false, id: 0, detail: false };
    var g = /^[^#]*\/-\/smw-facts\/([^/]+)\/?([^/]+)?(?:\/(details))?/;
    var b = /#\/([^/]+)\/?([^/]+)?(?:\/(details))?/;
    var i;
    var f = false;
    var e = $("<div class='smw-loading-splash'>Loading</div>");
    var h = function (n, o, m) {
        c = a;
        a = { type: n, id: o, detail: m };
        if (m) {
            YUI().use("aui-modal", function (p) {
                f = false;
                i = new p.Modal({
                    id: "smw-detailed-view",
                    bodyContent: e.clone(),
                    headerContent: '<h3><div style="height: 1em;"></div></h3>',
                    centered: true,
                    modal: true,
                    draggable: false,
                    resizable: false,
                    destroyOnHide: true,
                    render: "#modal",
                    width: "95%",
                    height: "95%",
                    zIndex: "10",
                });
                i.on("destroy", function () {
                    if (!f) {
                        if (c.type) {
                            j(c.type, c.id, false);
                        } else {
                            j(false, 0, false);
                        }
                    }
                });
                i.render();
                sGet = "./widget/microcircuit/-/smw-facts/";
                if (n) {
                    sGet += n;
                    if (o) {
                        sGet += "/" + o;
                    }
                }
                sGet += "/details/index.html?p_p_state=exclusive";
                $.get(sGet, function (s, q, t) {
                    var r = $(s);
                    $("#smw-detailed-view .modal-body").html(r.filter("#content").html());
                    $("#smw-detailed-view .modal-header h3").html(r.filter("#title").html());
                });
            });
        } else {
            if (i) {
                f = true;
                i.hide();
                i = false;
            }
            var l = "./widget/microcircuit/-/smw-facts/";
            if (n) {
                l += n;
                if (o) {
                    l += "/" + o;
                }
            }
            l += ".html?p_p_state=exclusive";
            $("#smw-side-panel-content").html(e.clone()).load(l);
        }
    };
    var k = function (m) {
        if (m.ctrlKey || m.metaKey) {
            return true;
        }
        var l = g.exec($(this).attr("href"));
        if (l !== null) {
            j(l[1], l[2], l[3]);
            return false;
        }
        return true;
    };
    var d = function (l) {
        if (window.location.hash !== "") {
            smwAsync.updateFromHash(window.location.hash);
        } else {
            smwAsync.updateFromUrl(window.location);
        }
    };
    var j = function (n, o, m) {
        if (n === a.type && o === a.id && m === a.detail) {
            return;
        }
        var l = "#/";
        if (n) {
            l += n + "/" + o;
            if (m) {
                l += "/details";
            }
        }
        window.location.hash = l;
    };
    smwAsync.updateFromUrl = function (n, m) {
        var l = g.exec(n);
        if (l !== null) {
            h(l[1], l[2], l[3]);
        } else {
            if (!m) {
                window.location = window.location;
            }
        }
    };
    smwAsync.updateFromHash = function (m) {
        var l = b.exec(m);
        if (l !== null) {
            h(l[1], l[2], l[3]);
        } else {
            h(false);
        }
    };
    smwAsync.init = function () {
        $(document).on("click", "a", k);
        $(window).on("hashchange", d);
        if (window.location.hash !== "") {
            smwAsync.updateFromHash(window.location.hash);
        } else {
            smwAsync.updateFromUrl(window.location, true);
        }
    };
})();
var smwEquationTooltip = smwEquationTooltip ? smwEquationTooltip : { firstTime: true };
(function () {
    var popover;
    smwEquationTooltip.init = function () {
        if (popover) {
            popover.popover("hide");
            popover = undefined;
        }
        if (smwEquationTooltip.firstTime) {
            smwEquationTooltip.firstTime = false;
            $(window).click(function () {
                if (popover) {
                    popover.popover("hide");
                }
            });
        }
        $(".smw-equation")
            .popover({
                trigger: "manual",
                placement: "left",
                html: true,
                content: function () {
                    var $this = $(this);
                    var name = $this.data("name");
                    var content = $("<div></div>");
                    var C_WIDTH = 300;
                    var C_HEIGHT = 100;
                    var $canvas = $("<div><canvas width='" + C_WIDTH + "' height='" + C_HEIGHT + "'></canvas><div>");
                    $this.children("span").each(function () {
                        var $span = $(this);
                        var mech = $("<div class='smw-mech' data-equation='" + $span.data("equation") + "' data-latex='" + $span.data("latex") + "'></div>").appendTo(content);
                        mech.append("<h4>" + $span.text() + "</h4>");
                        mech.append("<div>" + $span.data("name") + "<div>");
                        mech.append($canvas.clone());
                    });
                    return content.html();
                },
            })
            .click(function () {
                if (popover) {
                    popover.popover("hide");
                }
                popover = $(this);
                popover.popover("show");
                $(".popover-content .smw-mech").each(function () {
                    $this = $(this);
                    var equation = $this.data("equation");
                    var latex = $this.data("latex");
                    var fx = function (x) {
                        var exp = Math.exp;
                        return eval(equation);
                    };
                    var values = [];
                    var label = [];
                    var max = -Infinity;
                    var min = Infinity;
                    for (var i = 0; i < 900; i += 100) {
                        var val = fx(i);
                        values.push(val);
                        if (val > max) {
                            max = val;
                        }
                        if (val < min) {
                            min = val;
                        }
                        label.push(i);
                    }
                    label.push("μm");
                    if (max == min) {
                        max = 2 * max;
                    }
                    if (max < 1) {
                        var order = Math.pow(10, Math.ceil(-Math.log(max) / Math.LN10));
                        max = Math.ceil(max * order) / order;
                    } else {
                        max = Math.ceil(max * 10) / 10;
                    }
                    var $canvas = $this.find("canvas");
                    var ctx = $canvas[0].getContext("2d");
                    new Chart(ctx).Line(
                        { labels: label, datasets: [{ fillColor: "rgba(220,0,0,0.5)", strokeColor: "rgba(220,0,0,1)", pointColor: "rgba(220,220,220,1)", pointStrokeColor: "#fff", data: values }] },
                        { pointDot: false, bezierCurve: false, animation: false, scaleOverride: true, scaleStartValue: 0, scaleSteps: 2, scaleStepWidth: max / 2 }
                    );
                    $this.css({});
                    $("<div>" + latex + "<div>")
                        .appendTo($this)
                        .mathquill();
                });
                return false;
            });
    };
})();
