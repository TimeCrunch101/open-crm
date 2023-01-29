<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
const auth = useAuthStore()

const token = ref(auth.getToken)

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
        companyName: form.value.street,
        companyName: form.value.city,
        companyName: form.value.state,
        companyName: form.value.zip,
        companyName: form.value.country,
        companyName: form.value.primaryPhone,
        companyName: form.value.fax,
        companyName: form.value.website,
    },{
    headers: {
        Authorization: `Bearer ${auth.getToken}`
    }
}).then((res) => {
    console.log(res.data.message)
    }).catch((err) => {
        console.error(err.response.data)
    })
}


</script>
<template>
    <h1>Create Client</h1>
    <div class="container">
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
</template>