<?php include 'includes/header.php' ?>
            <section id='profile' class=''> 
                
		        <div class="container">
		            <div class="row ">
                        <div class='row headingStyle'>
                            <div class='col-md-6'> 
                               <h2  style='font-weight:500; color:#466480;'>Viewing {{studentDetails.fullname}}'s Record</h2>
                            </div>
                            <div class='col-md-6'> 
                                 <a href="students.php" class='btn btnAddnew btn-default btnView pull-right' >View All</a>
                            </div>
                            <hr>   
                        </div>
                        
                        <div class='col-md-3 text-center'>
                            <img alt="Pic" v-if='studentDetails.photo' class="inline-block mb24 profileImg" :src="baseUrl+'/'+studentDetails.photo.filename" width='200px' height='200px'>
                            <img alt="Pic"  v-else-if='!studentDetails.photo && studentDetails.gender'  class="inline-block mb24 profileImg" src="img/male2.jpg" width='200px' height='auto'>
                            <img alt="Pic" v-else   class="inline-block mb24 profileImg" src="img/female2.png" width='200px' height='auto'>
                            <h3 class='headerTitle'>{{studentDetails.fullname}}</h3>
                            <a :href="'updateStudent.php?id='+studentDetails._id" class='btn btn-block btnView'><i class='fa fa-edit'></i></a>
                            <a href=""  v-on:click='deleteStudent' class='btn btn-block btn-danger btnDel'><i class='fa fa-trash'></i></a>
                        </div>
                        <div class='col-md-9 bodyBorder'>
                            <div class="col-sm-4" > 
                                <table class="table table-responsive profiletable table-striped detailTable" >
                                    <tbody>
                                        <tr class='studentsInfo' >
                                            <td width='40%'><strong> Full Name :</strong> </td>
                                            <td width='60%'>{{studentDetails.fullname}}</td>
                                        </tr>
                                        <tr class='studentsInfo'>
                                            <td width='40%'><strong> Gender :</strong></td>
                                            <td v-if='studentDetails.gender' width='60%'>Male</td>
                                            <td v-else width='60%'>Female</td>
                                        </tr>
                                        <tr class='studentsInfo'>
                                            <td width='40%'><strong> Email Address:</strong></td>
                                            <td width='60%'>{{studentDetails.email}}</td>
</ttr>
                                        <tr class='studentsInfo'>
                                            <td width='40%'><strong> Mobile Number :</strong></td>
                                            <td width='60%'>{{studentDetails.mobile}}</td>
                                        </tr>
                                        <tr class='studentsInfo'>
                                            <td width='40%'><strong> Date Of Birth :</strong></td>
                                            <td width='60%'>{{studentDetails.dob}}</td>
                                        </tr>
                                        <tr class='studentsInfo'>
                                            <td width='40%'><strong> Contact Address :</strong></td>
                                            <td width='60%'>{{studentDetails.fullAddress}} </td>
                                        </tr>
                                        <tr class='studentsInfo'>
                                            <td width='40%'><strong> Course Of Study :</strong></td>
                                            <td width='60%'>{{studentDetails.course}}</td>
                                        </tr>
                                        <tr class='studentsInfo'>
                                            <td width='40%'><strong> Current Level :</strong></td>
                                            <td width='60%'>{{studentDetails.current_level}}</td>
                                        </tr>
                                        <tr class='studentsInfo'>
                                            <td width='40%'><strong> Current Session :</strong></td>
                                            <td width='60%'>{{studentDetails.current_session}}</td>
                                        </tr>
                                        <tr class='studentsInfo'>
                                            <td width='40%'><strong> Student Identification :</strong></td>
                                            <td width='60%'>{{studentDetails.student_code}}</td>
                                        </tr>
                                        <tr class='studentsInfo'>
                                            <td width='40%'><strong> Registration Date :</strong></td>
                                            <td width='60%'>{{studentDetails.regDate}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>    
		            </div>
		            
		        </div>
		        <!-- Modal -->
                <div class="modal fade" id="comfirmDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <!-- <h5 v-if='deleted' class="modal-title text-danger" id="exampleModalLabel" v-else>Delete Student Record!</h5> -->
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div v-if='deleted' class="modal-body text-center text-danger">
                    {{message}}
                </div>
                <div v-else class="modal-body text-center ">
                    {{message}}
                </div>
                <div class="modal-footer" v-if='deleted'>
                    <a class="btn btn-small btnView" v-on:click='deleteRecord'> Delete </a>
                    <a class="btn btn-small btnView" data-dismiss="modal">Cancel</a>
                </div>
                </div>
		    </section>
<?php include 'includes/footer.php' ?>
            
            