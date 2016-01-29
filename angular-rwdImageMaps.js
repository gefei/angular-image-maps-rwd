/*
* rwdImageMaps AngularJS Directive v1.0
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
* 
* Original Copyright (c) 2013 Matt Stow
* https://github.com/stowball/jQuery-rwdImageMaps
* http://mattstow.com
* Licensed under the MIT license
*
* angular-rwdImageMaps.js (by Philip Saa)
* (c) zilla Partners Pty Ltd
* https://github.com/cowglow/
* @cowglow
*
* Enhanced by https://github.com/cowglow/angular-image-maps-rwd/pull/1/files
*/


angular.module('rwdImageMaps',[])
    .directive('rwdimgmap', function($window){
        return{
            restrict: 'CA',
            link:function(scope, element, attrs){

                    var w = $(element).attr('width'),
                        h = $(element).attr('height');

                    function resize(){
                        var elem = angular.element(element)[0];
                        if (!w || !h) {
                            var temp = new Image();
                            temp.src = elem.src;
                            if(temp.src == undefined)
                                temp.src = $(element).attr('ng-src');

                            if (!w)
                                w = temp.width;
                            if (!h)
                                h = temp.height;
                        }

                        var wPercent = elem.width/100,
                            hPercent = elem.height/100,
                            map = attrs.usemap.replace('#', ''),
                            c = 'coords',
                            areas = angular.element(document.querySelector('map[name="' + map + '"]')).find('area');

                        angular.forEach(areas, function(item){
                            var area = angular.element(item);
                            if (!area.data(c)){
                                !area.data(c, area.attr(c));
                            }

                            var coords = area.data(c).split(','),
                                coordsPercent = new Array(coords.length);

                            for (var i = 0; i<coordsPercent.length; ++i){
                                if (i % 2 === 0){
                                    coordsPercent[i] = parseInt(((coords[i]/w)*100)*wPercent);
                                } else {
                                    coordsPercent[i] = parseInt(((coords[i]/h)*100)*hPercent);
                                }
                            }
                            area.attr(c, coordsPercent.toString());
                        });
                    }

                    resize();
                    angular.element($window).bind("resize", resize)

            }
        };
    });