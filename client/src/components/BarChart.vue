  
<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { ref } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartOptions = ref({
    responsive: true
})

const chartData = ref({
    labels: ['January', 'February', 'March'],
    datasets: [{
        label: 'Dataset',
        backgroundColor: '#177c9e',
        data: [50,20,12]
    }]
})

const myStyles = ref([
    {"background-color": '#acacac'}
])

</script>

<template>
    <div>
        <Bar :style="myStyles"  id="my-chart-id" :options="chartOptions" :data="chartData"/>
    </div>
</template>

<style scoped>
div {
    width: 600px;
    background-color: #acacac;
}
</style>