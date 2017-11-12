<?php include 'includes/header.php' ?>
            <section id='students' class=''> 
		        <div class="container">
		            <div class="row ">
                        <div class='col-md-10 col-md-offset-1'>
                            <div class='row headingStyle'>
                                <div class='col-md-6'> 
                                <h2  style='font-weight:500; color:#466480;'>All Students</h2>
                                </div>
                                <div class='col-md-6'> 
                                        <form class=''>
                                            <div class='form-group'>
                                                <input type="text" placeholder='Search with Student code number' class='form-control' @keyup="searchStudents" @keyup.enter='searchStudents'  >
                                            </div>
                                        </form>
                                </div>
                                
                            </div>
                            <hr>
                            <div class='row'>
                                <template v-if='filterStudents.length === 0 && paginatedStudents.length > 0'>
                                        <div class="col-md-4 text-center"  v-for='student in  paginatedStudents'>
                                            <div class="feature boxed cast-shadow-light"> 
                                            
                                                <img alt="Pic" v-if='student.photo' class="image-small inline-block mb24" :src="baseUrl+'/'+student.photo.filename">
                                                <img alt="Pic"  v-else-if='!student.photo && student.gender'  class="image-small inline-block mb24" src="img/male2.jpg">
                                                <img alt="Pic" v-else   class="image-small inline-block mb24" src="img/female2.png">
                                            
                                                <h4 class='name'>{{student.fullname}} <br> <span> <small class='smallText text-center'><b> {{student.email}}</b> </small> </span></h4>
                                                <p class='studentsInfo'>    <strong> Study Level : </strong>
                                                    {{student.current_level}} </p>    
                                                <p class='studentsInfo'>    <strong> Study Course : </strong>
                                                    {{student.course}} </p> 
                                                <p class='studentsInfo'>    <strong> Identification : </strong> {{student.student_code}} 
                                                </p>
                                                <div class=''>
                                                    <a :href="'profile.php?id='+student._id" class='btn btn-block btn-primary btnView'><i class='fa fa-eye'></i>View Details</a>
                                                    <a :href="'updateStudent.php?id='+student._id" class='btn btn-block btn-default btnEdit'><i class='fa fa-edit'></i>Edit Details</a>
                                                </div>
                                            </div>
                                        </div> 
                                        <div class='col-md-12 text-center'>
                                            <nav aria-label="...">
                                                <ul class="pagination pagination-lg">
                                                    <li class="page-item disabled" v-if='has_more'>
                                                    <a class="page-link" :href="prevUrl" tabindex="-1" @click='getPage'>Previous</a>
                                                    </li>
                                                    <li class="page-item" v-else='has_more'>
                                                    <a class="page-link" :href="prevUrl" tabindex="-1" @click='getPage'>Previous</a>
                                                    </li>
                                                    <li class="page-item" v-for='page in pages'>
                                                    <a class="page-link" :href="page.url" @click='getPage'>{{page.number}}</a>
                                                    <li class="page-item " v-if='has_more'>
                                                    <a class="page-link" :href="nextUrl" @click='getPage'>Next</a>
                                                    </li>
                                                    <li class="page-item disabled" v-else='has_more'>
                                                    <a class="page-link" :href="nextUrl" @click='getPage'>Next</a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                </template>   
                                <template v-else-if="filterStudents.lenght !== 0 && registeredStudents.length !== 0">
                                    <div class="col-sm-4 text-center" v-for='student in filterStudents'>
                                        <div class="feature boxed cast-shadow-light"> 
                                    
                                            <img alt="Pic" v-if='student.photo' class="image-small inline-block mb24" :src="baseUrl+'/'+student.photo.filename">
                                            <img alt="Pic"  v-else-if='!student.photo && student.gender'  class="image-small inline-block mb24" src="img/male2.jpg">
                                            <img alt="Pic" v-else   class="image-small inline-block mb24" src="img/female2.png">
                                        
                                            <h4 class='name'>{{student.fullname}} <br> <span> <small class='smallText text-center'><b> {{student.email}}</b> </small> </span></h4>
                                            <p class='studentsInfo'>    <strong> Study Level : </strong>
                                                {{student.current_level}} </p>    
                                            <p class='studentsInfo'>    <strong> Study Course : </strong>
                                                {{student.course}} </p> 
                                            <p class='studentsInfo'>    <strong> Identification : </strong> {{student.student_code}} 
                                            </p>
                                            <div class=''>
                                                <a :href="'profile.php?id='+student._id" class='btn btn-block btn-primary btnView'><i class='fa fa-eye'></i>View Details</a>
                                                <a :href="'updateStudent.php?id='+student._id" class='btn btn-block btn-default btnEdit'><i class='fa fa-edit'></i>Edit Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div>
                                        <p class='text-center' >
                                            There are currently no registered students!
                                        </p>
                                    </div>
                                </template>
                            </div>
                        </div>    
                    </div>
		        </div>
		    </section>
            <!-- Modal loading bar-->
            <div id="overlay">
                <div id="progstat"></div>
                <div id="progress"></div>
            </div>
<?php include 'includes/footer.php' ?>
            
            