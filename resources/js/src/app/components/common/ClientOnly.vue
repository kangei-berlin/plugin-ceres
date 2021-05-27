<script>
export default {
    data ()
    {
        return {
            isMounted: false
        }
    },

    render(){
        if(this.isMounted)
        {
            return this.$slots.default ? `<div>${this.$slots.default}</div>` : null;
        }
    },
    mounted(){
        this.isMounted = true;
    }
}
</script>