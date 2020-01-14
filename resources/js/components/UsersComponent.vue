<template>
    <div class="container">
        <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Responsive Hover Table</h3>

              <div class="card-tools">
                <button type="" class="btn btn-success" @click="openModal">Add New <i class="fas fa-user-plus"></i></button>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="card-body table-responsive no-padding">
              <table class="table table-hover">
                <tbody>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Registered at</th>
                  <th>Modify</th>
                </tr>
                <tr v-for="user in users" :key="user.id">
                  <td>{{user.id}}</td>
                  <td>{{user.name}}</td>
                  <td>{{user.email}}</td>
                  <td>{{user.type | upText}}</td>
                  <td>{{user.created_at | myDate }}</td>
                  <td>
                      <a @click="editUser(user)">
                          <i class="fa fa-edit"></i>
                      </a>
                        /
                      <a @click="deleteUser(user.id)">
                          <i class="fa fa-trash" style="color:red"></i>
                      </a>
                  </td>
                </tr>
              </tbody></table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="addNew" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="addNew" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <form @submit.prevent=" editMode ? updateUser() : createUser()">
              <div class="modal-header"> 
                <h5 v-show="!editMode" lass="modal-title" id="addNew">Add New</h5>
                <h5 v-show="editMode" class="modal-title" id="addNew">Update User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                <div class="form-group">
                  <input v-model="form.name" type="text" name="name" placeholder="Name" 
                    class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                  <has-error :form="form" field="name"></has-error>
                </div>

                <div class="form-group">
                  <input v-model="form.email" type="email" name="email" placeholder="Email" 
                    class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                  <has-error :form="form" field="email"></has-error>
                </div>

                <div class="form-group">
                  <input v-model="form.password" type="password" name="password" placeholder="Password" 
                    class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                  <has-error :form="form" field="password"></has-error>
                </div>

                <div class="form-group">
                  <textarea v-model="form.bio" name="bio" id="bio" placeholder="Short Bio" 
                    class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                  <has-error :form="form" field="bio"></has-error>
                </div>
                
                <div class="form-group">
                  <select v-model="form.type" id="type" name="type" 
                    class="form-control" :class="{'is-invalid': form.errors.has('type') }">
                      <option value="">Select User Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">Standart User</option>
                      <option value="author">Author</option>
                    </select>
                  <has-error :form="form" field="type"></has-error>
                </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="submit"  v-show="editMode" class="btn btn-success">Update</button>
                <button type="submit" v-show="!editMode" lass="btn btn-primary">Create</button>
              </div>
              </form>
            </div>
          </div>
        </div>

    </div>
</template>

<script>
    import Form from 'vform'
    export default {
        data() {
            return {
            editMode: false,
            users: {},
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
        loadUsers() {
          axios
          .get('api/user')
          .then(({data}) => (this.users = data.data)); 
        },
        openModal() {
            this.editMode = false
            this.form.reset()
            $('#addNew').modal('show')
        },
        editUser(user) {
            this.editMode = true
            this.form.reset()
            $('#addNew').modal('show')
            this.form.fill(user)
        },

        updateUser(id){
          this.$Progress.start();
          this.form.put('api/user/'+this.form.id)
          .then(() => {
            //success
            $('#addNew').modal('hide')
            Swal.fire(
                  'Updated!',
                  'User has been Updated.',
                  'success'
                )
              this.$Progress.finish();
          })
          .catch(()=> {
          this.$Progress.fail();

          });
        },
        
        createUser(){
            this.$Progress.start();
            this.form.post('api/user')
            .then(()=>{
              $('#addNew').modal('hide')
              toast.fire({
              icon: 'success',
              title: 'User created successfully'
              });
              Fire.$emit('AfterCreate');
              this.$Progress.finish();
              })
              .catch(()=>{}) 
        },
        deleteUser(id) { 
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                this.$Progress.start();
                this.form.delete('api/user/'+id)
                  if (result.value) {
                  Swal.fire(
                    'Deleted!',
                    'User has been deleted.',
                    'success'
                  )
                  this.$Progress.finish();
                }            
            })
                

        }
      },
        created() {
            this.loadUsers();
            //Fire.$on('AfterCreate',() => {this.loadUsers()});
            // setInterval(() => this.loadUsers(), 3000);
            console.log('Component mounted.')
        }
    }
</script>