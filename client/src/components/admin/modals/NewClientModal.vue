<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useAuthStore } from '../../../stores/auth';
import Success from '../../alerts/Success.vue';
import Error from '../../alerts/Error.vue';
const auth = useAuthStore()

const successMessage = ref(null)
const error = ref({
    message: null,
    cause: null
})

const form = ref({
    companyName: null,
    street: null,
    city: null,
    state: null,
    zip: null,
    country: null,
    primaryPhone: null,
    fax: null,
    website: null,
})

const createClient = () => {
    axios.put("/api/create/client",{
        companyName: form.value.companyName,
        street: form.value.street,
        city: form.value.city,
        state: form.value.state,
        zip: form.value.zip,
        country: form.value.country,
        primaryPhone: form.value.primaryPhone,
        fax: form.value.fax,
        website: form.value.website,
    },{
    headers: {
        Authorization: `Bearer ${auth.getToken}`
    }
}).then((res) => {
    successMessage.value = res.data.message
    }).catch((err) => {

        error.value.message = err.response.data.error
        error.value.cause = err.response.data.cause
    })
}


</script>
<template>
    <Success v-if="successMessage" :message="successMessage" />
    <Error v-if="error.message" :errorMessage="error.message" :errorCause="error.cause"/>
    <div class="modal fade" id="newClientModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">New Client Form</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="createClient()">
                    <label for="companyName" class="form-label">Company Name</label>
                    <input type="text" name="companyName" id="companyName" class="form-control form-control-sm" v-model="form.companyName" required>
            
                    <label for="street" class="form-label">Street Address:</label>
                    <input type="text" name="street" id="street" class="form-control form-control-sm" v-model="form.street" required>
            
                    <label for="city" class="form-label">City:</label>
                    <input type="text" name="city" id="city" class="form-control form-control-sm" v-model="form.city" required>
                    
                    <label for="state" class="form-label">State:</label>
                    <select name="state" id="state" class="form-select form-select-sm" v-model="form.state" required>
                        <option selected style="display: none;">State</option>
                        <option value="OH">Ohio</option>
                        <option value="KY">Kentucky</option>
                        <option value="TX">Texas</option>
                    </select>
            
                    <label for="zip" class="form-label">Zip Code</label>
                    <input type="text" name="zip" id="zip" class="form-control form-control-sm" v-model="form.zip" required>
                    
                    <label for="country" class="form-label">Country</label>
                    <select name="country" id="country" class="form-select form-select-sm mb-1" v-model="form.country" required>
                        <option select style="display: none;">Please select the country...</option>
                        <option value="United States">United States</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Canada">Canada</option>
                    </select>
            
                    <label for="primaryPhone" class="form-label">Primary Phone</label>
                    <input type="text" name="primaryPhone" id="primaryPhone" class="form-control form-control-sm" v-model="form.primaryPhone" required>
            
                    <label for="fax" class="form-label">Fax</label>
                    <input type="text" name="fax" id="fax" class="form-control form-control-sm" v-model="form.fax" required>
            
                    <label for="website" class="form-label">website</label>
                    <input type="text" name="website" id="website" class="form-control form-control-sm" v-model="form.website">
            
                    <button type="submit" class="btn btn-outline-success mt-3">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>