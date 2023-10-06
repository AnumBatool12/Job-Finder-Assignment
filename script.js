$(document).ready(function(){
    $.getJSON("data.json", function(data){//getting data
        console.log(data); 
        $.fn.DisplayData(data)

        

    })//end tag of get data.json
    .fail(function(){console.log("An error has occurred in get function.");});

    $.fn.DisplayData=function(data){//This function displays data on main screen
        let flexBody=$("flexBody");//so that we can append to it

        //appending white job container 
            data.forEach(element => {

            //creating a new job white container
            var $job=$(' <div class="job"></div>')

            //creating a new flexJob
            var $flexJob=$('<div class="flexJob"></div>')

            //creating div to store image
            var $divImage=$('<div class="jobImage"></div>')
            var $img=$(' <img src="' + element.logo + '">')
            $divImage.append($img)
            //creating div to store image

            //creating flexTitle
            var $flexTitle=$('<div class="flexTitle"></div>')

            //creating company titles
            var $compTitles=$('<div class="compTitles"></div>')
            var $compName=$('<span class="compName">' + element.company + '</span>')
            $compTitles.append($compName)

            if (element.new){//add new only
                var $newopt=$('<span id="newopt" class="info new">NEW!</span>') 
                $compTitles.append($newopt)
            }

            if (element.featured){//add new and feature tags 
                var $featopt=$('<span id="featopt" class="info feat">FEATURED</span>')
                $compTitles.append($featopt)
            }

            //creating company titles

            //creating job titles
            var $compTitles2=$('<div class="compTitles"></div>')
            var $title=$('<span class="title"><button id="jobClick">' + element.position + '</button></span>')
            $compTitles2.append($title)
            //creating job titles

            //creating position details
            var $posDetails=$('<div class="posDetails"></div>')
            var $list=$('<ul class="list"></ul>')
            var $first=$('<li class="first">' + element.postedAt + '</li>')
            var $second=$('<li>' + element.contract +'</li>')
            var $third=$('<li>' + element.location +'</li>')

            $list.append($first, $second, $third)
            $posDetails.append($list)
            //creating position details
            $flexTitle.append($compTitles, $compTitles2, $posDetails)
            //creating flexTitle

            //creating flexTools
            var $flexTools=$('<div class="flexTools"></div>')
            var $role=$('<input type="button" class="btnSettings btn" value="' + element.role + '">')
            var $level=$('<input type="button" class="btnSettings btn" value="' + element.level + '">')

            $flexTools.append($role, $level)

            element.languages.forEach(lang =>{
                var $l=$('<input type="button" class="btnSettings btn" value="' + lang + '">')

                $flexTools.append($l)
            })

            element.tools.forEach(tool =>{
                var $t=$('<input type="button" class="btnSettings btn" value="' + tool + '">')

                $flexTools.append($t)
            })
            //creating flexTools

            //appending all that data
            $flexJob.append($divImage, $flexTitle, $flexTools)
            $job.append($flexJob)
            $('.flexBody').append($job)
            
        });//end tag of data loop
    };


});//end tag of ready function
