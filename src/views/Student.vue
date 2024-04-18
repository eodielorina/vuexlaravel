<template>
    <div>
        <h1>Students</h1>
        <div class="card">
            <div class="card-header">
                <h4>Students
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                        @click="add">
                        Add Student
                    </button>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="stud in liste" :key="stud.id">
                            <td>{{ stud.id }}</td>
                            <td>{{ stud.name }}</td>
                            <td>{{ stud.email }}</td>
                            <td>{{ stud.phone }}</td>
                            <td>
                                <button class="btn btn-success mx-2" @click="edit(stud.id)">Editer</button>
                                <button class="btn btn-danger" @click="del(stud.id)">supprimer</button>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
            v-show="isModalVisible">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">{{ modal_title }}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form method="post" id="formulaire" v-on:submit.prevent="save" enctype="multipart/form-data">
                            <div class="form-group">
                                <label for="nom">Nom</label>
                                <input type="text" class="form-control" name="name" v-model="student.name">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="text" class="form-control" name="email" v-model="student.email">
                            </div>
                            <div class="form-group">
                                <label for="phone">Téléphone</label>
                                <input type="text" class="form-control" name="phone" v-model="student.phone">
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                <button type="submit" class="btn btn-primary"
                                    data-bs-dismiss="modal">Enregistrer</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import $ from "jquery";
import * as $ from "jquery";
import * as bootstrap from "bootstrap";
import { mapActions } from "vuex";
export default {
    name: 'student',
    data() {
        return {
            student: {
                name: '',
                phone: '',
                email: ''
            },
            isModalVisible: false,
            modal_title: 'Ajouter'
        }
    },
    computed: {
        liste() {
            return this.$store.state.students
        }

    },
    mounted() {
        this.$store.dispatch('sudentListe')
    },
    methods: {

        ...mapActions(['addaction', 'deleteField']),
        save(e) {
            e.preventDefault();
            this.addaction(this.student)

        },
        //     if (!this.student.id) {
        //         // this.$store.dispatch('addaction', {
        //         //     name: this.student.name,
        //         //     phone: this.student.phone,
        //         //     email: this.student.email
        //         // })
        //     } else { this.update(); }
        // },
        add() {
            this.student = {
                name: '',
                phone: '',
                email: ''
            }
        },
        del(id) {
            console.log(id)
            alert('Voulez vous supprimez vraiment?')
            this.deleteField(id);
            // this.$store.dispatch('deleteField', id);
        },
        edit(id) {
            console.log(id);
            this.modal_title = "Modification";
            this.$store.dispatch('editField', id);
            this.isModalVisible = true;
            $('#exampleModal').modal('show');
        },
        update() {
            this.$store.dispatch('updateField');
        }

    }

}


</script>
