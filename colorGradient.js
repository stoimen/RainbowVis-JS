define(function () {
    return function () {
        var startColour = 'ff0000';
        var endColour = '0000ff';
        var minNum = 0;
        var maxNum = 100;

        this.setGradient = function (colourStart, colourEnd) {
            startColour = getHexColour(colourStart);
            endColour = getHexColour(colourEnd);
        }

        this.setNumberRange = function (minNumber, maxNumber) {
            if (maxNumber > minNumber) {
                minNum = minNumber;
                maxNum = maxNumber;
            } else {
                throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
            }
        }

        this.colourAt = function (number) {
            return calcHex(number, startColour.substring(0, 2), endColour.substring(0, 2))
                + calcHex(number, startColour.substring(2, 4), endColour.substring(2, 4))
                + calcHex(number, startColour.substring(4, 6), endColour.substring(4, 6));
        }

        function calcHex(number, channelStart_Base16, channelEnd_Base16) {
            var num = number;
            if (num < minNum) {
                num = minNum;
            }
            if (num > maxNum) {
                num = maxNum;
            }
            var numRange = maxNum - minNum;
            var cStart_Base10 = parseInt(channelStart_Base16, 16);
            var cEnd_Base10 = parseInt(channelEnd_Base16, 16);
            var cPerUnit = (cEnd_Base10 - cStart_Base10) / numRange;
            var c_Base10 = Math.round(cPerUnit * (num - minNum) + cStart_Base10);
            return formatHex(c_Base10.toString(16));
        }

        formatHex = function (hex) {
            if (hex.length === 1) {
                return '0' + hex;
            } else {
                return hex;
            }
        }

        function isHexColour(string) {
            var regex = /^#?[0-9a-fA-F]{6}$/i;
            return regex.test(string);
        }

        function getHexColour(string) {
            if (isHexColour(string)) {
                return string.substring(string.length - 6, string.length);
            } else {
                var colourNames =
                    [
                        ['red', 'ff0000'],
                        ['lime', '00ff00'],
                        ['blue', '0000ff'],
                        ['yellow', 'ffff00'],
                        ['orange', 'ff8000'],
                        ['aqua', '00ffff'],
                        ['fuchsia', 'ff00ff'],
                        ['white', 'ffffff'],
                        ['black', '000000'],
                        ['gray', '808080'],
                        ['grey', '808080'],
                        ['silver', 'c0c0c0'],
                        ['maroon', '800000'],
                        ['olive', '808000'],
                        ['green', '008000'],
                        ['teal', '008080'],
                        ['navy', '000080'],
                        ['purple', '800080']
                    ];
                for (var i = 0; i < colourNames.length; i++) {
                    if (string.toLowerCase() === colourNames[i][0]) {
                        return colourNames[i][1];
                    }
                }
                throw new Error(string + ' is not a valid colour.');
            }
        }
    }

});