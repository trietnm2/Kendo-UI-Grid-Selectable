/*
 * Kendo UI Web v2013.3.1119 (http://kendoui.com)
 * Copyright 2013 Telerik AD. All rights reserved.
 *
 * Kendo UI Web commercial licenses may be obtained at
 * https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
 * If you do not own a commercial license, this file shall be governed by the
 * GNU General Public License (GPL) version 3.
 * For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
 */
! function (define) {
    return define(["./kendo.core.min", "./kendo.userevents.min"], function () {
        ! function (e) {
            function t(e, t) {
                var n = s.getOffset(e),
                    i = t.left + t.width,
                    l = t.top + t.height;
                return n.right = n.left + e.outerWidth(), n.bottom = n.top + e.outerHeight(), !(n.left > i || n.right < t.left || n.top > l || n.bottom < t.top)
            }

            function n(e, n, i, s) {
                var l, a, o;
                for (l = 0, a = e.length; a > l; l++) o = e.eq(l), t(o, i) ? o.hasClass(c) ? s && n !== o[0] && o.removeClass(c).addClass(m) : o.hasClass(u) || o.hasClass(m) || o.addClass(u) : o.hasClass(u) ? o.removeClass(u) : s && o.hasClass(m) && o.removeClass(m).addClass(c)
            }
            var i, s = window.kendo,
                l = s.ui.Widget,
                a = e.proxy,
                o = Math.abs,
                r = "aria-selected",
                c = "k-state-selected",
                u = "k-state-selecting",
                f = "k-selectable",
                d = "change",
                v = ".kendoSelectable",
                m = "k-state-unselecting",
                h = !1;
            ! function (e) {
                ! function () {
                    e('<div class="parent"><span /></div>').on("click", ">*", function () {
                        h = !0
                    }).find("span").click().end().off()
                }()
            }(e), i = l.extend({
                init: function (t, n) {
                    var i, o = this;
                    l.fn.init.call(o, t, n), o._lastActive = null, o.element.addClass(f), i = o.options.multiple, o.userEvents = new s.UserEvents(o.element, {
                        global: !0,
                        allowSelection: !0,
                        filter: (h ? "" : "." + f + " ") + o.options.filter,
                        tap: a(o._tap, o)
                    }), i 
                },
                events: [d],
                options: {
                    name: "Selectable",
                    filter: ">*",
                    multiple: !1
                },
                _tap: function (t) {
                    var n, i = e(t.target),
                        s = this,
                        l = t.event.ctrlKey || t.event.metaKey,
                        a = s.options.multiple,
                        o = a && t.event.shiftKey,
                        r = t.event.which,
                        u = t.event.button;
                    i.closest("." + f)[0] !== s.element[0] || r && 3 == r || u && 2 == u || (n = i.hasClass(c), a && l || s.clear(), o ? s.selectRange(s._firstSelectee(), i) : (n && l ? (s._unselect(i), s._notify(d)) : s.value(i), s._lastActive = s._downTarget = i))
                },
                _start: function (t) {
                    var n = this,
                        i = e(t.target),
                        s = i.hasClass(c),
                        l = t.event.ctrlKey || t.event.metaKey;
                    return n._downTarget = i, i.closest("." + f)[0] !== n.element[0] ? (n.userEvents.cancel(), n._downTarget = null, undefined) : (n._marquee.appendTo(document.body).css({
                        left: t.x.client + 1,
                        top: t.y.client + 1,
                        width: 0,
                        height: 0
                    }), l || n.clear(), s && (n._selectElement(i, !0), l && i.addClass(m)), undefined)
                },
                _end: function () {
                    var e = this;
                    e._marquee.remove(), e._unselect(e.element.find(e.options.filter + "." + m)).removeClass(m), e.value(e.element.find(e.options.filter + "." + u)), e._lastActive = e._downTarget
                },
                value: function (e) {
                    var t = this,
                        n = a(t._selectElement, t);
                    return e ? (e.each(function () {
                        n(this)
                    }), t._notify(d), undefined) : t.element.find(t.options.filter + "." + c)
                },
                _firstSelectee: function () {
                    var e, t = this;
                    return null !== t._lastActive ? t._lastActive : (e = t.value(), e.length > 0 ? e[0] : t.element.find(t.options.filter))
                },
                _selectElement: function (t, n) {
                    var i = e(t),
                        s = !n && this._notify("select", {
                            element: t
                        });
                    i.removeClass(u), s || (i.addClass(c), this.options.aria && i.attr(r, !0))
                },
                _notify: function (e, t) {
                    return t = t || {}, this.trigger(e, t)
                },
                _unselect: function (e) {
                    return e.removeClass(c), this.options.aria && e.attr(r, !1), e
                },
                _select: function (t) {
                    var n = "input,a,textarea,.k-multiselect-wrap,select",
                        i = s.support.browser.msie;
                    e(t.event.target).is(n) ? (this.userEvents.cancel(), this._downTarget = null) : (!i || i && !e(s._activeElement()).is(n)) && t.preventDefault()
                },
                clear: function () {
                    var e = this.element.find(this.options.filter + "." + c);
                    this._unselect(e)
                },
                selectRange: function (t, n) {
                    var i, s, l, o, r = this,
                        u = !1,
                        f = r.element.find(r.options.filter),
                        v = a(r._selectElement, r);
                    for (t = e(t)[0], n = e(n)[0], i = 0, s = f.length; s > i; i++) o = f[i], u ? (v(o), u = o !== n) : o === t ? (u = t !== n, v(o)) : o === n ? (l = t, t = n, n = l, u = !0, v(o)) : e(o).removeClass(c);
                    r._notify(d)
                },
                destroy: function () {
                    var e = this;
                    l.fn.destroy.call(e), e.element.off(v), e.userEvents.destroy()
                }
            }), s.ui.plugin(i)
        }(window.kendo.jQuery)
    })
}("function" == typeof define && define.amd ? define : function (e, t) {
    return t()
});
//@ sourceMappingURL=kendo.selectable.min.js.map