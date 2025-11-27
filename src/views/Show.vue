<script>
import { api } from '../helpers/helpers';
export default {
    name: 'show',
    data() {
        return {
            word: '',
        };
    },
    async mounted() {
        this.word = await api.getWord(this.$route.params.id);
    },
};

</script>