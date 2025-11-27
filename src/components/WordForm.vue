<template>
    <form action="#" @submit.prevent="onSubmit">
        <p v-if="errorsPresent" class="error">Please fill out all flieds!</p>
        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="united kingdom flag"></i> English
            </div>
            <input type="text" placeholder="Enter word ..." v-model="words.english" />
        </div>
        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="germany flag"></i> German
            </div>
            <input type="text" placeholder="Enter word ..." v-model="words.german" />
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="vietnam flag"></i> Vietnamese
            </div>
            <input type="text" placeholder="Enter word ..." v-model="words.vietnamese" />
        </div>
    </form>
</template>

<script>
export default {
    name: 'word-form',
    props: {
        word: {
            type: Object,
            required: false,
            default: () => {
                return {
                    english: '',
                    german: '',
                    vietnamese: ''
                };
            }
        }
    },
    data() {
        return {
            errorsPresent: false,
        };
    },
    methods: {
        onSubmit: function() {
            if (this.word.english === '' || this.word.german === '' || this.word.vietnamese === '') {
                this.errorsPresent = true;
            } else {
                this.$emit('create0rUpdate', this.word);
            }
        }
    }
};
</script>