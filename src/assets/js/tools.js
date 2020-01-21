// 工具类函数
export default {
    install(Vue, options){
        // 时间戳转日期格式
        Vue.prototype.getYMDHMS = function (timestamp){
            var date = new Date(timestamp * 1);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = ((date.getMonth()+1)<10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1))+ '-';
            var D = (date.getDate() < 10 ? '0'+date.getDate():date.getDate())+ ' ';
            var h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
            var m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes())+ ':';
            var s = (date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds());
            return Y+M+D+h+m+s;
        },
        // 时间戳转日期格式
        Vue.prototype.getYMD = function (timestamp){
            var date = new Date(timestamp * 1);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = ((date.getMonth()+1)<10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1))+ '-';
            var D = (date.getDate() < 10 ? '0'+date.getDate():date.getDate());
            return Y+M+D;
        },
        // 解决js运算小数精度问题
        Vue.prototype.floatMul= function (a, b) {
                var c = 0,
                    d = a.toString(),
                    e = b.toString();
                try {
                    c += d.split(".")[1].length;
                } catch (f) {}
                try {
                    c += e.split(".")[1].length;
                } catch (f) {}
                return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
        }
    }
}
