/**
 * mysql 输入框
 * @author ming
 */
 (function($){
	'use strict';
	 
	$.prototype.addSqlTipInfo = function (options) {
        return new SqlTipInfo(this, options);
    };

    function SqlTipInfo(jqobj, options) {
        this.jqobj = jqobj;
		var defaultOption = this.defaultOption;
        this.options = $.extend({}, defaultOption, options);
        this.init();
    }

    SqlTipInfo.prototype = {
        keys: ["ADD", "ALL", "ALTER", "ANALYZE", "AND", "AS", "ASC", "ASENSITIVE", "BEFORE", "BETWEEN", "BIGINT", "BINARY", "BLOB", "BOTH", "BY", "CALL", "CASCADE", "CASE", "CHANGE", "CHAR", "CHARACTER", "CHECK", "COLLATE", "COLUMN", "CONDITION", "CONNECTION", "CONSTRAINT", "CONTINUE", "CONVERT", "CREATE", "CROSS", "CURRENT_DATE", "CURRENT_TIME", "CURRENT_TIMESTAMP", "CURRENT_USER", "CURSOR", "DATABASE", "DATABASES", "DAY_HOUR", "DAY_MICROSECOND", "DAY_MINUTE", "DAY_SECOND", "DEC", "DECIMAL", "DECLARE", "DEFAULT", "DELAYED", "DELETE", "DESC", "DESCRIBE", "DETERMINISTIC", "DISTINCT", "DISTINCTROW", "DIV", "DOUBLE", "DROP", "DUAL", "EACH", "ELSE", "ELSEIF", "ENCLOSED", "ESCAPED", "EXISTS", "EXIT", "EXPLAIN", "FALSE", "FETCH", "FLOAT", "FLOAT4", "FLOAT8", "FOR", "FORCE", "FOREIGN", "FROM", "FULLTEXT", "GOTO", "GRANT", "GROUP", "HAVING", "HIGH_PRIORITY", "HOUR_MICROSECOND", "HOUR_MINUTE", "HOUR_SECOND", "IF", "IGNORE", "IN", "INDEX", "INFILE", "INNER", "INOUT", "INSENSITIVE", "INSERT", "INT", "INT1", "INT2", "INT3", "INT4", "INT8", "INTEGER", "INTERVAL", "INTO", "IS", "ITERATE", "JOIN", "KEY", "KEYS", "KILL", "LABEL", "LEADING", "LEAVE", "LEFT", "LIKE", "LIMIT", "LINEAR", "LINES", "LOAD", "LOCALTIME", "LOCALTIMESTAMP", "LOCK", "LONG", "LONGBLOB", "LONGTEXT", "LOOP", "LOW_PRIORITY", "MATCH", "MEDIUMBLOB", "MEDIUMINT", "MEDIUMTEXT", "MIDDLEINT", "MINUTE_MICROSECOND", "MINUTE_SECOND", "MOD", "MODIFIES", "NATURAL", "NOT", "NO_WRITE_TO_BINLOG", "NULL", "NUMERIC", "ON", "OPTIMIZE", "OPTION", "OPTIONALLY", "OR", "ORDER", "OUT", "OUTER", "OUTFILE", "PRECISION", "PRIMARY", "PROCEDURE", "PURGE", "RAID0", "RANGE", "READ", "READS", "REAL", "REFERENCES", "REGEXP", "RELEASE", "RENAME", "REPEAT", "REPLACE", "REQUIRE", "RESTRICT", "RETURN", "REVOKE", "RIGHT", "RLIKE", "SCHEMA", "SCHEMAS", "SECOND_MICROSECOND", "SELECT", "SENSITIVE", "SEPARATOR", "SET", "SHOW", "SMALLINT", "SPATIAL", "SPECIFIC", "SQL", "SQLEXCEPTION", "SQLSTATE", "SQLWARNING", "SQL_BIG_RESULT", "SQL_CALC_FOUND_ROWS", "SQL_SMALL_RESULT", "SSL", "STARTING", "STRAIGHT_JOIN", "TABLE", "TERMINATED", "THEN", "TINYBLOB", "TINYINT", "TINYTEXT", "TO", "TRAILING", "TRIGGER", "TRUE", "UNDO", "UNION", "UNIQUE", "UNLOCK", "UNSIGNED", "UPDATE", "USAGE", "USE", "USING", "UTC_DATE", "UTC_TIME", "UTC_TIMESTAMP", "VALUES", "VARBINARY", "VARCHAR", "VARCHARACTER", "VARYING", "WHEN", "WHERE", "WHILE", "WITH", "WRITE", "X509", "XOR", "YEAR_MONTH", "ZEROFILL"],
		
		defaultOption : {
			highlight : false
		},
		
        init: function () {
            this.identifier = this.getIdentifier();
            this.initTipInfo();
            this.cloneTextArea();
            this.initEvents();
        },

        getIdentifier: function (name) {
            var identifier = "99_sqltipinfo_";

            if (name) {
                identifier += name;
            } else {
                var index = 0;
                while ($("body").find("#" + identifier + "identifer_" + index).length > 0) {
                    index++;
                }
                return this.getIdentifier("identifer_" + index);
            }
            return identifier;
        },

        initTipInfo: function () {
            var identifier = this.identifier;
            this.tipInfoContainer = $("<div id='" + identifier + "' class='sys-sqltipinfo-container'></div>");
            $("body").append(this.tipInfoContainer);
        },

        cloneTextArea: function () {
            var thisJqObj = this.jqobj;
            thisJqObj.wrap("<div class='sys-sqltipinfo-wrap'></div>");
            this.clone = $("<div class='sys-sqltipinfo-cloneTextArea lang-sql'></div>");
            this.clone.css({
                height: thisJqObj.height(),
                width: thisJqObj.width(),
                border: thisJqObj.css("border"),
                padding: thisJqObj.css("padding"),
                margin: thisJqObj.css("margin"),
                background: thisJqObj.css("background"),
                font: thisJqObj.css("font"),
                lineHeight: thisJqObj.css("line-height"),
                letterSpacing: thisJqObj.css("letter-spacing"),
                whiteSpace: thisJqObj.css("white-space"),
                wordSpacing: thisJqObj.css("word-spacing"),
                wordWrap: thisJqObj.css("word-wrap")
            });
            this.clone.insertAfter(thisJqObj);
        },

        initEvents: function () {
            var thisobj = this;
            var thisJqObj = this.jqobj;
            thisJqObj.on("keydown", function (e) {
                var index = -1;
                if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13) {
                    index = thisobj.tipInfoContainer.find("li[class='selected']").index();
                    if (e.keyCode === 38 && index > 0) {
                        index--;
                        thisobj.tipInfoContainer.find("li").removeClass("selected");
                        thisobj.tipInfoContainer.find("li").eq(index).addClass("selected");
                        return false;
                    }
                    if (e.keyCode === 40 && thisobj.tipInfoContainer.find("li").length > (index + 1)) {
                        index++;
                        thisobj.tipInfoContainer.find("li").removeClass("selected");
                        thisobj.tipInfoContainer.find("li").eq(index).addClass("selected");
                        return false;
                    }
                    if (e.keyCode === 13) {
                        thisobj.tipInfoContainer.find("li").eq(index).trigger("click");
                        return false;
                    }
                    return false;
                }

            });

            thisJqObj.on("blur", function () {
				if(thisobj.options.highlight) {
					thisobj.tipInfoContainer.hide();
					thisobj.clone.html(thisJqObj.val());
					thisJqObj.hide();
					thisobj.clone.each(function (i, block) {
						hljs.highlightBlock(block);
					});
					thisobj.clone.css("visibility", "visible");
				}
            });

            thisJqObj.on("keyup click", function (e) {
                if (e.type === "keyup") {
                    if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13) {
                        return;
                    }
                    if (e.keyCode === 27) {
                        thisobj.tipInfoContainer.hide();
                        return;
                    }
                }

                var html = $(this).val();

                var pos = getPosOfSlindRoudStr();
                if (pos.start === pos.end) {
                    thisobj.tipInfoContainer.hide();
                    return;
                }

                var cloneText = html.substring(0, pos.start) + "<span class='sys-sqltipinfo-pos'></span>";
                thisobj.clone.html(cloneText);

                var strRoundSlind = html.substring(pos.start, pos.end).replace(/^\s+|\s+$/g, "");
                var matchItems = getMatchItems(strRoundSlind);
                freshTipInfo(matchItems);
            });

            thisobj.tipInfoContainer.on("click", "li", function () {
                var pos = getPosOfSlindRoudStr();
                var html = thisJqObj.val();

                html = html.substring(0, pos.start + 1) + $(this).html() + html.substring(pos.end, html.length);
                thisJqObj.val(html);
                var slindLocation = pos.start + 1 + $(this).html().length;
                setSlindLocation(slindLocation);
                thisobj.tipInfoContainer.hide();
            });

            thisobj.clone.on("click", function () {
                $(this).css("visibility", "hidden");
                thisJqObj.show();
                setSlindLocation();
            });

            function getPosOfSlindRoudStr() {
                var html = thisJqObj.val();
                var positionStart = thisJqObj[0].selectionStart;
                var positionEnd = thisJqObj[0].selectionEnd;

                if (positionStart !== positionEnd) {
                    return {
                        start: -1,
                        end: -1
                    };
                }

                var find = false;
                var start = positionStart - 1, end = positionStart;
                for (var i = positionStart - 1; i >= 0; i--) {
                    if (html.charAt(i).match(/\s/)) {
                        start = i;
                        find = true;
                        break;
                    }
                }
                if (!find) {
                    start = i;
                }
                find = false;

                for (var j = end; j < html.length; j++) {
                    if (html.charAt(j).match(/\s/)) {
                        end = j;
                        find = true;
                        break;
                    }
                }
                if (!find) {
                    end = j;
                }
                return {
                    start: start,
                    end: end
                };
            }

            function getMatchItems(str) {
                var tipItems = [];
                if (str.length === 0) {
                    return tipItems;
                }
                str = str.toUpperCase();
                for (var i = 0; i < thisobj.keys.length; i++) {
                    if (thisobj.keys[i].indexOf(str) === 0 && thisobj.keys[i] !== str) {
                        tipItems.push(thisobj.keys[i]);
                    }
                }

                return tipItems;
            }

            function freshTipInfo(items) {
                if (!thisobj.tipInfoContainer) {
                    thisobj.initTipInfo();
                }
                if (items && items.length > 0) {
                    var _html = "<ul>";
                    var val;
                    for (var i = 0, l = items.length; i < l; i++) {
                        val = items[i].toLowerCase();
                        _html += "<li title='" + val + "' data-val='" + val + "' class='" + (i === 0 ? "selected" : "") + "'>" + val + "</li>";
                    }

                    _html += "</ul>";
                    var offset = thisobj.clone.find(".sys-sqltipinfo-pos").offset();
                    offset.top = offset.top + 21;
                    thisobj.tipInfoContainer.html(_html).css(offset).show();
                } else {
                    thisobj.tipInfoContainer.hide();
                }
            }

            function setSlindLocation(location) {
                if (!location || isNaN(location) || location < 0) {
                    location = thisJqObj.val().length;
                }
                if (document.selection) {
                    var sel = thisJqObj[0].createTextRange();
                    sel.moveStart('character', location);
                    sel.collapse();
                    sel.select();
                } else {
                    thisJqObj.focus();
                    thisJqObj[0].selectionStart = thisJqObj[0].selectionEnd = location;
                }
            }
        }
    };
	
})($);