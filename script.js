$(document).ready(function(){
    $.getJSON("data.json", function(data){//getting data
        console.log(data); 
        $.fn.DisplayData(data)

        //Filter Div Functionality
        var addedFilters=[]

        $(document).on("click", ".btn", function(){
            if($(".filter").css("display")=="none"){
                $(".filter").show()
            }

            var value=$(this).attr("value")
            if (addedFilters.indexOf(value)==-1){
                
                $.fn.ShowFiltBtn(value)
                //Filtering out the same value
                $(".job:not(:has(.btn[value='" + value + "']))").hide(); 
                
                addedFilters.push(value);
            }         
        });

        //cross button
        $(document).on("click", ".crossBtn", function(){
            var Remove=$(this).closest('.spaceBtn').attr("data-value");
            console.log(Remove)
            $(this).closest('.spaceBtn').remove();
            $(".job:not(:has(.btn[value='" + Remove + "']))").show(); 
            $('.job[data-value="0"]').hide()//hiding the dummy htm

            addedFilters = addedFilters.filter(value => value!=Remove);

            console.log(addedFilters)

            if(addedFilters.length==0){
                $(".filter").css("display", "none");
            }
        })
        //cross button

        //Clear button
        $(document).on ("click", "#clearBtn", function(){
            $(".filter").css("display", "none");
            $(".job").show();
            $('.job[data-value="0"]').hide()//hiding the dummy html
        });
        //Clear button
        
        //Filter Div Functionality

        //pop up functionality
        $(document).on ("click", "#jobClick", function () {
            var id=$(this).attr("value")
            let info=data[id-1]
            $.fn.ShowPop(info)
        });
        //pop up functionality

        //Add Form Functionality
        $(document).on("click", "#addBtn", function(){
            $(".addpopupContainer").fadeIn("speed")
            var element={
                "id":0,
                "company": "",
                "logo": "",
                "new": true,
                "featured": true,
                "position": "",
                "role": "",
                "level": "",
                "postedAt": "0d ago",
                "contract": "",
                "location": "",
                "languages": [],
                "tools": []
            }

            $.fn.AddData(data, element);
        });
        //Add Form Functionality


    })//end tag of get data.json
    .fail(function(){console.log("An error has occurred in get function.");});

    $.fn.DisplayData=function(data){//This function displays data on main screen
        let flexBody=$("flexBody");//so that we can append to it

        //appending white job container 
            data.forEach(element => {

            $.fn.AddElement(element, 'append', data)
            
        });//end tag of data loop
    };

    $.fn.AddElement=function(element, app, data){
        //creating a new job white container
        var $job=$('<div class="job" data-value="'+ element.id+ '"></div>')

        //creating hide button
        var $hide=$('<div class="hide" data-value="'+ element.id+ '"></div>')
        var $del=$('<button class="delprop">X</button>')

        $hide.append($del);
        //creating hide button

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
        var $title=$('<span class="title"><button id="jobClick" value="' + element.id + '">' + element.position + '</button></span>')
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
        $job.append($hide, $flexJob)
        if (app=='append'){
            $('.flexBody').append($job)
        }
        else if (app=='prepend'){
            $('.flexBody').prepend($job)
        }

        //Functionality to show delete button on hover
        $(".job").on({
            mouseenter: function(){
                var id=$(this).attr("data-value")
                //$.fn.DelButton(id)
                $(".hide[data-value='" + id + "']").css("display", "inline");
                $(".hide").not("[data-value='" + id + "']").css("display", "none");

                $(this).on("click", ".delprop", function(){
                    data=data.filter(element=> element.id!=id)
                    console.log(data)
                    $(this).closest('.job').remove();
                });
                
            },
            mouseleave: function(){
                $(".hide").css("display", "none")
            }
        });
        //Functionality to show delete button on hover
        
    }

    $.fn.ShowPop=function(element){//This function displays popup
        let $pc=$('<div class="popupContainer" style="display: none;"></div>')
        var $inner=$('<div class="popupInner"></div>')

        //creating div to store image
        var $divImage=$('<div class="popJob"></div>')
        var $img=$(' <img src="' + element.logo + '">')
        $divImage.append($img)
        //creating div to store image

        //creating flexTitle
        var $flexTitle=$('<div class="pop"></div>')

        //creating company titles
        var $compTitles=$('<div class="compTitlespop"></div>')
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
        var $title=$('<span class="title">' + element.position + '</span>')
        $compTitles2.append($title)
        //creating job titles

        //creating position details
        var $posDetails=$('<div class="posDetails"></div>')
        var $list=$('<ul class="listpop"></ul>')
        var $first=$('<li class="lip">' + element.postedAt + '</li>')
        var $second=$('<li class="lip">' + element.contract +'</li>')
        var $third=$('<li class="lip">' + element.location +'</li>')

        $list.append($first, $second, $third)
        $posDetails.append($list)
        //creating position details
        $flexTitle.append($compTitles, $compTitles2, $posDetails)
        //creating flexTitle

        //creating flexTools
        var $flexTools=$('<div class="flexToolspop"></div>')
        var $role=$('<input type="button" class="btnSet btn" value="' + element.role + '">')
        var $level=$('<input type="button" class="btnSet btn" value="' + element.level + '">')

        $flexTools.append($role, $level)

        element.languages.forEach(lang =>{
            var $l=$('<input type="button" class="btnSet btn" value="' + lang + '">')

            $flexTools.append($l)
        })

        element.tools.forEach(tool =>{
            var $t=$('<input type="button" class="btnSet btn" value="' + tool + '">')

            $flexTools.append($t)
        })
        //creating flexTools

        var $close=$('<button class="close">Close</button>')

        //appending all that data
        $inner.append($divImage, $flexTitle, $flexTools, $close)
        $pc.append($inner)
        $('.flexBody').append($pc)
        $(".popupContainer").fadeIn("speed")

        $(".close").click(function(){
            $(".popupContainer").fadeOut("slow")
        });
    };

    $.fn.DelButton=function(id){//This function displays del button
        //$(".hide[data-value='" + id + "']").css("display", "inline")
        
    };

    $.fn.AddData=function(data, element){

        $(document).on("click", "#closeForm", function(){
            $(".addpopupContainer").fadeOut("slow")
        });

        $(document).on("click", "#saveForm", function(){
            $.fn.SaveData(data, element)
        });
    };

    $.fn.SaveData=function(data, element){
        var allFilled=true;

        //added company
        var company=$('#companyOpt option:selected').val();
        if (company=="None"){
            allFilled=false;
        }
        else{
            element.company=company;
            $.fn.getLogo(element, company)
        }

        //getting position
        var pos=$("#pos").val()
        if (pos==''){allFilled=false;}
        else {element.position=pos}

        //getting location
        var loc=$("#loc").val()
        if (loc==''){allFilled=false;}
        else {element.location=loc}

        //getting role
        var role=$('input[name="role"]:checked').val();
        if (!role){allFilled=false}
        else {element.role=role;}

        //getting level
        var level=$('input[name="level"]:checked').val();
        if (!level){allFilled=false}
        else {element.level=level;}

        //getting Timeing
        var time=$('input[name="time"]:checked').val();
        if (!time){allFilled=false}
        else {element.contract=time;}

        //getting lang
        element.languages = $('input[name="lang"]:checked').map(function(_, el) {
            return $(el).val();
        }).get();

        //getting tools
        element.tools = $('input[name="tool"]:checked').map(function(_, el) {
            return $(el).val();
        }).get();
        
        
        if (allFilled){
            data.unshift(element)
            data.forEach(element=>{
                element.id=element.id+1
            })

            $(".job").remove()
            $.fn.DisplayData(data)

            $(".addpopupContainer").fadeOut("slow")
        }
        else{
            alert("Fill all fields with red star!")
        }
    };

    $.fn.getLogo=function(element, company){
        if (company=="Photosnap") {element.logo="./images/photosnap.svg"}
        else if (company=="Manage") {element.logo="./images/manage.svg"}
        else if (company=="Account") {element.logo="./images/account.svg"}
        else if (company=="MyHome") {element.logo="./images/myhome.svg"}
        else if (company=="Loop Studios") {element.logo="./images/loop-studios.svg"}
        else if (company=="FaceIt") {element.logo="./images/faceit.svg"}
        else if (company=="Shortly") {element.logo="./images/shortly.svg"}
        else if (company=="Insure") {element.logo="./images/insure.svg"}
        else if (company=="Eyecam Co.") {element.logo="./images/eyecam-co.svg"}
        else if (company=="The Air Filter Company") {element.logo="./images/the-air-filter-company.svg"}
        else{
            element.logo="./images/the-air-filter-company.svg"
        }
    }

    $.fn.ShowFiltBtn=function(value){
        let btnDiv=$("#btnDiv")
        var $filt=$('<span class="spaceBtn" data-value="' + value + '">' + value + '<button class="crossBtn">X</button></span>')
        btnDiv.append($filt)
    }

});//end tag of ready function

