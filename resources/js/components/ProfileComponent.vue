<style>
    .widget-user-header {
        background-position: center center;
        background-size: cover;
    }
</style>
<template>
    <div class="container content">
           <div class="row card">
                    <div class="col-md-12 mt-3">
                      <!-- Widget: user widget style 1 -->
                      <div class="box box-widget widget-user">
                        <!-- Add the bg color to the header using any of the bg-* classes -->
                        <div class="widget-user-header bg-black" style="background-image:url('./img/user-cover.jpg');">
                          <h3 class="widget-user-username">Elizabeth Pierce</h3>
                          <h5 class="widget-user-desc">Web Designer</h5>
                      </div>
                      <div class="widget-user-image">
                          <img class="img-circle" src="" alt="User Avatar">
                      </div>
                      <div class="box-footer">
                          <div class="row">
                            <div class="col-sm-4 border-right">
                              <div class="description-block">
                                <h5 class="description-header">3,200</h5>
                                <span class="description-text">SALES</span>
                            </div>
                            <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-4 border-right">
                          <div class="description-block">
                            <h5 class="description-header">13,000</h5>
                            <span class="description-text">FOLLOWERS</span>
                        </div>
                        <!-- /.description-block -->
                    </div>
                    <!-- /.col -->
                    <div class="col-sm-4">
                      <div class="description-block">
                        <h5 class="description-header">35</h5>
                        <span class="description-text">PRODUCTS</span>
                        </div>
                    <!-- /.description-block -->
                    </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </div>
        </div>
        <!-- /.widget-user -->
        </div>
        </div>
        <div class="row card">
        <div class="col-md-9">
          <div class="nav-tabs-custom">
            <ul class="nav nav-tab">
                <li class="nav-item">
                    <a class="nav-link active" href="#activity" data-toggle="tab">Activity</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#settings" data-toggle="tab">Settings</a>
                </li>
            </ul>
            <div class="tab-content">
              <div class="active tab-pane" id="activity">
                <!-- Post -->
                <div class="post">
                  <div class="user-block">
                    <img class="img-circle img-bordered-sm" src="" alt="user image">
                        <span class="username">
                          <a href="#">Jonathan Burke Jr.</a>
                          <a href="#" class="pull-right btn-box-tool"><i class="fa fa-times"></i></a>
                        </span>
                    <span class="description">Shared publicly - 7:30 PM today</span>
                  </div>
                  <!-- /.user-block -->
                  <p>
                    Lorem ipsum represents a long-held tradition for designers,
                    typographers and the like. Some people hate it and argue for
                    its demise, but others ignore the hate as they create awesome
                    tools to help create filler text for everyone from bacon lovers
                    to Charlie Sheen fans.
                  </p>
                  <ul class="list-inline">
                    <li><a href="#" class="link-black text-sm"><i class="fa fa-share margin-r-5"></i> Share</a></li>
                    <li><a href="#" class="link-black text-sm"><i class="fa fa-thumbs-o-up margin-r-5"></i> Like</a>
                    </li>
                    <li class="pull-right">
                      <a href="#" class="link-black text-sm"><i class="fa fa-comments-o margin-r-5"></i> Comments
                        (5)</a></li>
                  </ul>

                  <input class="form-control input-sm" type="text" placeholder="Type a comment">
                </div>
                <!-- /.post -->
              </div>
              <!-- /.tab-pane -->

              <div class="tab-pane" id="settings">
                <form class="form-horizontal"
                     <div class="form-group">
                  <input v-model="form.name" type="text" name="name" placeholder="Name" 
                    class="form-control">
                  <has-error :form="form" field="name"></has-error>
                </div>

                <div class="form-group">
                  <input v-model="form.email" type="email" name="email" placeholder="Email" 
                    class="form-control">
                  <has-error :form="form" field="email"></has-error>
                </div>

                <div class="form-group">
                  <textarea v-model="form.bio" name="bio" id="bio" placeholder="Short Bio" 
                    class="form-control"></textarea>
                  <has-error :form="form" field="bio"></has-error>
                </div>
                
                <div class="form-group">
                  <label for="photo">Profile Photo</label>
                  <div class="col-sm-12">
                    <input type="file" @change="updateProfile" name="photo" class="form-input">
                  </div>
                </div>

                  <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                      <div class="checkbox">
                        <label>
                          <input type="checkbox"> I agree to the <a href="#">terms and conditions</a>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                      <button type="submit" class="btn btn-danger" @click.prevent="updateInfo">Update</button>
                    </div>
                  </div>
                </form>
              </div>
              <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
          </div>
          <!-- /.nav-tabs-custom -->
        </div>
        </div>
    </div>
</template>

<script>
    import Form from 'vform'
    export default {
      data() {
        return {
            form: new Form({
               id: '',
               name: '', 
               email: '', 
               password: '', 
               type: '', 
               bio: '', 
               photo: '' 
            }) 
            }
      },
      methods: {
      updateInfo() {
        this.$Progress.start();
        this.form.put('api/profile')
        .then(()=>{

        this.$Progress.finish();

        })
        .catch(()=>{
        this.$Progress.fail();
        });
      },
      updateProfile(e){
        let file = e.target.files[0];
        console.log(file.size);
        let reader = new FileReader();
        if (file['size'] < 2111775) {
          reader.onloadend = (file) => {
          this.form.photo = reader.result
          console.log(reader.result)
          }
          reader.readAsDataURL(file);  
        }
        else {
         Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'You are uploading a large file',
          })
        }
       }
      },
      mounted() {
            console.log(this.form);
      },
      created() {
        axios.get('api/profile')
        .then(({data})=>(this.form.fill(data)));
      }
    }
</script>
