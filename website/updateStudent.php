<?php include 'includes/header.php' ?>
            <section id='updateRecord' class=''> 
                
		        <div class="container">
		            <div class="row ">
                         <div class='row headingStyle'>
                            <div class='col-md-6'> 
                               <h2  style='font-weight:500; color:#466480;'>Update {{studentDetails.fullname}}'s Record</h2>
                            </div>
                            <hr>   
                        </div>
                        <div class='col-md-3 text-center'>
                            <img alt="Pic" v-if='studentDetails.photo' class="inline-block mb24 profileImg" :src="baseUrl+'/'+studentDetails.photo.filename" width='200px' height='200px'>
                            <img alt="Pic"  v-else-if='!studentDetails.photo && studentDetails.gender'  class="inline-block mb24 profileImg" src="img/male2.jpg" width='200px' height='auto'>
                            <img alt="Pic" v-else   class="inline-block mb24 profileImg" src="img/female2.png" width='200px' height='auto'>
                            <h3 class='headerTitle'>{{studentDetails.fullname}}</h3>
                            <a :href="'profile.php?id='+studentDetails._id" class='btn btn-block btnView'><i class='fa fa-eye'></i></a>
                            <a href=""  v-on:click='deleteStudent' class='btn btn-block btn-danger btnDel'><i class='fa fa-trash'></i></a>
                        </div>
                        <div class='col-md-9 bodyBorder'>
                            <form v-on:submit.prevent="onUpdate" enctype='multipart/form-data'>
                                <div class="form-group row">
                                    <label for="firstname" class="col-sm-2 col-form-label">First name</label>
                                    <div class="col-sm-10">
                                    <input type="text" class="form-control" id="firstname" placeholder="First name" v-model="firstname" required>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="lastname" class="col-sm-2 col-form-label">Last Name</label>
                                    <div class="col-sm-10">
                                    <input type="text" class="form-control" id="lastname" placeholder="Last name" v-model="lastname" required>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="email" class="col-sm-2 col-form-label">Email</label>
                                    <div class="col-sm-10">
                                    <input type="email" class="form-control" id="email" placeholder="Email Address" v-model="email" required>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="mobile" class="col-sm-2 col-form-label">Mobile</label>
                                    <div class="col-sm-10">
                                    <input type="text" class="form-control" id="mobile" placeholder="Your Mobile" v-model="mobile" required>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="gender" class="col-sm-2 col-form-label">Gender</label>
                                    <div class="col-sm-10">
                                        <select v-model="gender" id="gennder" class="form-control"  id="validationDefault01" required>
                                            <option value=''>Select Gender</option>
                                            <option v-for="genderType in genderTypes" v-bind:value="genderType.value">
                                                {{genderType.text}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="dob" class="col-sm-2 col-form-label">Date Of Birth</label>
                                    <div class="col-sm-10">
                                    <input type="date" class="form-control" id="dob" placeholder="Last name" v-model="dob" required>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="address" class="col-sm-2 col-form-label">Address</label>
                                    <div class="col-sm-10">
                                    <input type="text" class="form-control" id="address" placeholder="Your Contact Address" v-model='address' required>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="level" class="col-sm-2 col-form-label">Current Level</label>
                                    <div class="col-sm-10">
                                        <select v-model="currentLevel"  class="form-control" id="level" required> 
                                           <option value="">Select Current Level</option> 
                                            <option v-for='level in levels' v-bind:value="level.value">{{level.text}}</option> 
                                        </select>  
                                    </div>
                                </div> 
                                <div class="form-group row">
                                    <label for="session" class="col-sm-2 col-form-label">Current Session</label>
                                    <div class="col-sm-10">
                                      <input type="text" class="form-control" id="session" placeholder="Your Current Session" v-model="session" required> 
                                    </div>
                                </div> 
                                <div class="form-group row">
                                    <label for="course" class="col-sm-2 col-form-label">Course of Study</label>
                                    <div class="col-sm-10">
                                        <input v-model="course" placeholder='Your Course of Studet' class="form-control"  id="course" required > 
                                    </div>
                                </div> 
                                <div class="form-group row">
                                    <label for="photo" class="col-sm-2 col-form-label">Photo</label>
                                    <div class="col-sm-10">
                                         <input type="file" class="form-control" id="photo"  accept="image/*" placeholder="Browse photo" @change="filesChange" >
                                    </div>
                                </div> 
                                <div class="form-group row">
                                    <div class="col-sm-10">
                                    <button type="submit" class="btn btn-primary">Update Record</button>
                                    </div>
                                </div>
                            </form>   
		            </div>
		            
		        </div>
		        <!-- Modal -->
                <div class="modal fade" id="updateFeedback" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-success" id="exampleModalLabel" v-if='message.success === true'>Update Successful</h5>
                    <h5 class="modal-title text-danger" id="exampleModalLabel" v-else>Error!</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-center" v-if='message.success === true'>
                    {{message.successMsg}}
                </div>
                <div class="modal-body text-center" v-else>
                    {{message.errMsg}}
                </div>
                </div>
		    </section>
<?php include 'includes/footer.php' ?>
            
            