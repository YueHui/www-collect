<template>
    <Breadcrumb :current-name="data.name" />
    <div class="flex flex-row">
        <div class="leading-relaxed flex-grow">
            <div :class="`grid grid-cols-10 max-md:grid-cols-6 text-4xl`">
                <div v-for="(p, index) in getPinYin(data.pinyin)" :key="index">{{ p }}</div>
            </div>
            <div :class="`grid grid-cols-10 max-md:grid-cols-6 text-4xl`">
                <div v-for="(n, index) in data.name.split('')" :key="index">{{ n }}</div>
            </div>
            <div v-if="data.emotion">感情色彩: {{data.emotion}}</div>
            <!--        <div>{{ getData(data.jbsy).toString() }}</div>-->

            <div v-for="(item, index) in getData(data.xxsy)" :key="index">{{ item }}</div>

            <h3>近义词</h3>
            <div class="flex gap-2 flex-wrap">
                <div v-for="(item, index) in getData(data.jyc)" :key="index">
                    <NuxtLink v-if="getSimilarData(item)" :to="`/cy/${getSimilarData(item)._id}`">
                        {{item}}
                    </NuxtLink>
                    <span v-else>{{ item }}</span>
                </div>
            </div>

            <h3>反义词</h3>
            <div class="flex gap-2 flex-wrap">
                <div v-for="(item, index) in getData(data.fyc)" :key="index">
                    <NuxtLink v-if="getSimilarData(item)" :to="`/cy/${getSimilarData(item)._id}`">{{
                            item
                        }}
                    </NuxtLink>
                    <span v-else>{{ item }}</span>
                </div>
            </div>

            <template v-if="data.story">
                <h3 class="mt-6 mb-3 text-xl font-bold">成语故事</h3>
                <div class="bg-gray-50 p-6 rounded-lg shadow">
                    <div class="prose max-w-none" v-html="data.story.content" />
                </div>
            </template>

        </div>
    </div>
</template>

<script setup>
let similarResults = ref([]);
const route = useRoute()
const {data} = await useFetch(`/api/cy/${route.params.id}`)

const similarData = getData(data.value.jyc).concat(getData(data.value.fyc));
if (similarData.length > 0) {
    const {data} = await useFetch(`/api/cy/getDetailsByName`, {
        method: 'POST',
        body: similarData
    })
    if (data.value && data.value.length > 0) {
        similarResults.value = data.value;
    }
}

useHeadSafe({
    title: `${data.value.name}的意思_${data.value.name}的解释_${data.value.name}的近义词 - 聚全网`,
    meta: [
        {
            name: 'keywords',
            content: `${data.value.name},${data.value.name}的意思,${data.value.name}的解释,${data.value.name}的近义词,${data.value.name}的反义词,${data.value.name}的成语故事,${data.value.name}的典故出处`
        },
        {
            name: 'description',
            content: `${data.value.name}是什么意思？${getData(data.value.xxsy).join('；')}。查看${data.value.name}的近义词、反义词、读音、典故等详细解释。`
        },
        {
            name: 'og:title',
            content: `${data.value.name} - 成语详解`
        },
        {
            name: 'og:description',
            content: getData(data.value.xxsy).join('；')
        }
    ]
})

function getData(str) {
    try {
        return JSON.parse(str) || []
    } catch (err) {
        return []
    }
}

function getSimilarData(data) {
    return similarResults.value.find(item => item.name === data);
}

function getPinYin(data) {
    let result = [];
    let firstArray = data.split('，');
    firstArray.forEach((item,index)=>{
        result = result.concat(item.split(" "))
        if(index < firstArray.length - 1){
            result = result.concat("，")
        }
    })
    return result;
}
</script>

<style scoped>
.nameTable {
    text-align: center;
}

:deep(.prose p) {
    text-indent: 2em;
    margin-bottom: 1em;
}
</style>