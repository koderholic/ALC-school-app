<?php include 'includes/header.php' ?>
            <section id='register'>
		        <div class="container">
		            <div class="row pb48">
		                <div class="col-sm-10 col-sm-offset-1 text-center">
                            <h3 class='text-center headerTitle'> STUDENT REGISTRATION PORTAL</h3>
		                    <p class="lead">Please fill in your details correctly in the form below, if your are not registered yet</p>
                        </div>
                    </div>
                    <hr>
                    <div class='row '>
                        <div class='col-md-8 col-md-offset-2 formBackground '>   
                        <form  v-on:submit.prevent="onSubmit" enctype='multipart/form-data'>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                <label for="firstname">First Name</label>
                                <input type="text" class="form-control" id="firstname" placeholder="First name" v-model="firstname" >
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="lastname">Last Name</label>
                                    <input type="text" class="form-control" id="lastname" placeholder="Last name" v-model="lastname" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                <label for="gender">Gender</label>
                                <select v-model="gender" id="gennder" class="form-control"  id="validationDefault01" required>
                                    <option value=''>Select Gender</option>
                                    <option v-for="genderType in genderTypes" v-bind:value="genderType.value">
                                        {{genderType.text}}</option>
                                </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="validationDefault02">Date Of Birth</label>
                                    <input type="date" class="form-control" id="validationDefault02" placeholder="Last name" v-model="dob" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" id="email" placeholder="Email Address" v-model="email" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                <label for="mobile">Mobile</label>
                                <input type="text" class="form-control" id="mobile" placeholder="Your Mobile" v-model="mobile" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-8 mb-3">
                                <label for="address">Address</label>
                                <input type="text" class="form-control" id="address" placeholder="Your Contact Address" v-model='address' required>
                                <!-- <div class="invalid-feedback">
                                    Please provide a valid state.
                                </div> -->
                                </div>
                                <div class="col-md-4 mb-3">
                                <label for="validationDefault03">City</label>
                                <select v-model="city" id="" class="form-control"  id="validationDefault01" required>
                                    <option value=''>Select City</option>
                                    <option v-for="city in cities" v-bind:value="city._id">{{city.name}}</option>
                                </select>
                                <!-- <div class="invalid-feedback">
                                    Please provide a valid city.
                                </div> -->
                                </div
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label for="level">Current Level</label>
                                    <select v-model="currentLevel"  class="form-control" id="level" required> 
                                       <option value="">Select Current Level</option> 
                                     <option v-for='level in levels' v-bind:value="level.value">{{level.text}}</option> 
                                    </select>   
                                    <!-- Please provide a valid state. -->
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="session">Current Session</label>
                                    <input type="text" class="form-control" id="session" placeholder="Your Current Session" v-model="session" required>
                                    <!-- <div class="invalid-feedback">
                                        Please provide a valid city.
                                    </div> -->
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="course">Course Of Study</label>
                                    <input v-model="course" placeholder='Your Course of Studet' class="form-control"  id="course" required >
                                    <!-- <div class="invalid-feedback">
                                        Please provide a valid Postal Code.
                                    </div> -->
                                </div>
                            </div>
                            <div class="row">
                                
                                <div class="col-md-12 mb-3">
                                <label for="photo">Photo</label>
                                <input type="file" class="form-control" id="photo"  accept="image/*" placeholder="Browse photo" @change="filesChange" >
                                </div>
                            </div>
                            <button class="btn btn-primary btn-small formbtn" >Submit form</button>
                            </form>
                        </div>     
		            </div>
		            
		        </div>
		        <!-- Modal -->
                <div class="modal fade" id="feedback" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-success" id="exampleModalLabel" v-if='message.success === true'>Registration Successful</h5>
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
                <div class="modal-footer" v-if='message.success === true'>
                    <a class="btn btn-small btnView" ><i class='fa fa-eye'></i> View </a>
                    <a class="btn btn-small btnView"><i class='fa fa-edit'></i> Edit</a>
                </div>
                </div>
            </div>
            </div>
            </section>
           
            

<?php include 'includes/footer.php' ?>            