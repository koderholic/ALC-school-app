
//loading page progress bar
(function(){
    function id(v){ return document.getElementById(v); }
    function loadbar() {
      var ovrl = id("overlay"),
          prog = id("progress"),
          stat = id("progstat"),
          img = document.images,
          c = 0,
          tot = img.length;
      if(tot == 0) return doneLoading();
  
      function imgLoaded(){
        c += 1;
        var perc = ((100/tot*c) << 0) +"%";
        prog.style.width = perc;
        stat.innerHTML = "Fetching Student..."+ perc;
        if(c===tot) return doneLoading();
      }
      function doneLoading(){
        ovrl.style.opacity = 0;
        setTimeout(function(){ 
          ovrl.style.display = "none";
        }, 1200);
      }
      for(var i=0; i<tot; i++) {
        var tImg     = new Image();
        tImg.onload  = imgLoaded;
        tImg.onerror = imgLoaded;
        tImg.src     = img[i].src;
      }    
    }
    document.addEventListener('DOMContentLoaded', loadbar, false);
  }());

var baseUrl = 'http://localhost:3000';

//Register View
new Vue({
   el : "#register",

  data: {

        firstname: '',
        lastname: '',
        gender: '',
        genderTypes : [
            {text : 'Male', value : 1 },
            {text : 'Female', value : 0 }
        ],
        dob : '',
        email : '',
        mobile : '',
        address : '',
        city : '',
        cities : [ ],
        currentLevel : '',

        levels : [
            {text : '100 Level', value : '100 Level' },
            {text : '200 Level', value : '200 Level' },
            {text : '300 Level', value : '300 Level' },
            {text : '400 Level', value : '400 Level' },
            {text : '500 Level', value : '500 Level' },
            {text : '600 Level', value : '600 Level' }
        ],
        session : '',
        course : '',
        photo : '',
        baseUrl : 'http://localhost:3000',
        message : {}
        
  },   
  created() {
    axios.get(baseUrl+"/students/register")
    .then(result => {
        if(result.data.success){
            this.cities = result.data.responseData.cities;
        }else{
            console.log(result.data.successMsg);
        }
    }).catch((err) => {
        console.log(err);
    });
  },  
    methods: {
        filesChange : function (e) {
            e.preventDefault();
            this.photo = e.target.files[0];
            // this.photo = fieldName;
        },
        onSubmit : function (resource) {
            let data = new FormData();
            data.append('photo', this.photo);
            data.append('firstname', this.firstname);
            data.append('lastname', this.lastname);
            data.append('gender', this.gender);
            data.append('dob', this.dob);
            data.append('email', this.email);
            data.append('mobile', this.mobile);
            data.append('address', this.address);
            data.append('city', this.city);
            data.append('level', this.currentLevel);
            data.append('session', this.session);
            data.append('course', this.course);
            axios({
                method: 'post',
                url: baseUrl+'/students/register',
                headers: {'Content-Type': 'multipart/form-data; boundary='+'data._boundary'},
                data: data
            }).then((response) => {
                    this.message = response.data;
                    $('#feedback').modal('show');
                
            }).catch((err) => {
                this.message = err.response.data;
                $('#feedback').modal('show');
            
            });    
        }    
    },
})


//List students
new Vue({
    el : "#students",

    data : {
        registeredStudents : [],
        baseUrl : 'http://localhost:3000',
        searchParam : '',
        filterStudents : [],
        paginatedStudents : [],
        resourceUrl : this.baseUrl+"/students",
        pages : [],
        prevUrl : '',
        nextUrl : '',
        has_more : false
    },
    mounted (){
        axios.get(baseUrl+"/students")
        .then(result => {
            this.paginatedStudents = result.data.paginatedData;
            
            console.log(result.data.responseData);
            this.registeredStudents = result.data.responseData;
            this.pages = result.data.pages;
            this.prevUrl = result.data.prevUrl;
            this.nextUrl = result.data.nextUrl;
            this.has_more = result.data.has_more;
        }).catch((err) => {
            console.log(err.response.data.errMsg);
        });
    },
    
    methods:{
        searchStudents : function (e) {
            e.preventDefault();
            if (e.target.value) {
                    this.filterStudents = this.registeredStudents.filter(student => {
                    return student.student_code.toLowerCase().indexOf(e.target.value.toLowerCase()) === 0
                });
            }else{
                this.filterStudents = [];
            }
        },
        getPage : function (e) {
            e.preventDefault();
            var pageUrl = e.target.href.split('/');
            axios.get(baseUrl+'/'+pageUrl[3])
            .then(result => {
                this.paginatedStudents = result.data.paginatedData;
                this.registeredStudents = result.data.responseData;
                this.pages = result.data.pages;
                this.prevUrl = result.data.prevUrl;
                this.nextUrl = result.data.nextUrl;
                this.has_more = result.data.has_more;
            }).catch((err) => {
                console.log(err.response.data.errMsg);
            });
        }
    },
});

new Vue({
    el : "#profile",

    data : {
        studentDetails : {},
        baseUrl : 'http://localhost:3000',
        message : '',
        deleted : true,
        $http : axios
    },
    mounted (){
        axios.get(baseUrl+"/students/"+window.location.href.split('=')[1])
        .then(result => {
            console.log(result.data.responseData)
            this.studentDetails = result.data.responseData;
        }).catch((err) => {
            console.log(err.response.data.errMsg);
        });
    },
    methods:{
        deleteStudent : function(e){
            e.preventDefault();
            this.message = 'Click on delete to comfirm the deleting of this record';
            $('#comfirmDelete').modal('show');
        },
        deleteRecord : function (params) {
            axios.delete(baseUrl+"/students/"+window.location.href.split('=')[1])
            .then(result => {
                this.message = 'Record Deleted Successfully!';
                this.deleted = false;
                window.location ='students.php';
            }).catch((err) => {
                console.log(err.response.data.errMsg);
            });
        }
    }
});


new Vue({
    el : "#updateRecord",

    data : {
        deleted : true,
        firstname: '',
        lastname: '',
        gender: '',
        genderTypes : [
            {text : 'Male', value : 1 },
            {text : 'Female', value : 0 }
        ],
        dob : '',
        email : '',
        mobile : '',
        address : '',
        city : '',
        cities : [ ],
        currentLevel : '',

        levels : [
            {text : '100 Level', value : '100 Level' },
            {text : '200 Level', value : '200 Level' },
            {text : '300 Level', value : '300 Level' },
            {text : '400 Level', value : '400 Level' },
            {text : '500 Level', value : '500 Level' },
            {text : '600 Level', value : '600 Level' }
        ],
        session : '',
        course : '',
        photo : '',
        studentDetails : {},
        baseUrl : 'http://localhost:3000',
        message : {}
        
    },
    created() {
        axios.get(baseUrl+"/students/register")
        .then(result => {
                this.cities = result.data.responseData.cities;
        }).catch((err) => {
            console.log(err);
        });
      }, 
    mounted (){
        axios.get(baseUrl+"/students/"+window.location.href.split('=')[1])
        .then(result => {
            console.log(result.data.responseData)
            this.firstname= result.data.responseData.firstname;
            this.lastname= result.data.responseData.lastname;
            this.gender= (result.data.responseData.gender)? 1 : 0;
            this.dob = moment(result.data.responseData.date_of_birth).format("YYYY-MM-DD");
            this.email = result.data.responseData.email;
            this. mobile = result.data.responseData.mobile;
            this. address = result.data.responseData.address;
            this.city = result.data.responseData.city_id._id;
            this.currentLevel = result.data.responseData.current_level;
            this.session = result.data.responseData.current_session;
            this.course = result.data.responseData.course;
            this.studentDetails = result.data.responseData;
        }).catch((err) => {
            console.log(err.response.data.errMsg);
        });
    },
    methods:{
        filesChange : function (e) {
            e.preventDefault();
            this.photo = e.target.files[0];
            // this.photo = fieldName;
        },
        onUpdate : function (resource) {
            let data = new FormData();
            data.append('photo', this.photo);
            data.append('firstname', this.firstname);
            data.append('lastname', this.lastname);
            data.append('gender', this.gender);
            data.append('dob', this.dob);
            data.append('email', this.email);
            data.append('mobile', this.mobile);
            data.append('address', this.address);
            data.append('city', this.city);
            data.append('level', this.currentLevel);
            data.append('session', this.session);
            data.append('course', this.course);
            axios({
                method: 'patch',
                url: baseUrl+"/students/"+window.location.href.split('=')[1]+"/update",
                headers: {'Content-Type': 'multipart/form-data; boundary='+'data._boundary'},
                data: data
            }).then((response) => {
                    this.message = response.data;
                    $('#updateFeedback').modal('show');
                    $('#updateFeedback').on('hidden.bs.modal', function () {
                        window.location.reload(true);
                    })
                
            }).catch((err) => {
                this.message = err.response.data;
                $('#updateFeedback').modal('show');
            
            });    
        },    
        deleteStudent : function(e){
            e.preventDefault();
            this.message = 'Click on delete to comfirm the deleting of this record';
            $('#comfirmDelete').modal('show');
        },
        deleteRecord : function (params) {
            axios.delete(baseUrl+"/students/"+window.location.href.split('=')[1])
            .then(result => {
                this.message = 'Record Deleted Successfully!';
                this.deleted = false;
                window.location ='students.php';
            }).catch((err) => {
                console.log(err.response.data.errMsg);
            });
        }
    }
});
