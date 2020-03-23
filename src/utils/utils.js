import moment from 'moment';

export default class Utils {

    static GridDateFormatter(params) {
        const { value } = params;

        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.000Z$/.test(value)) {
            const datePart = value.split('T')[0];
            const timePart = value.split('T')[1];
            const dateArray = datePart.split('-');
            const timeArray = timePart.split(':');

            return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]} ${timeArray[0]}:${timeArray[1]}`;
        }

        return value;
    }

    static GridCurrencyFormatter(params) {
        return 'R$ ' + parseFloat(params.value).toLocaleString('pt');
    }

    static GridCpfCnpjFormatter(params) {

        if (params.value.length === 11) {

            let cpf = params.value;
            // retira os caracteres indesejados...
            cpf = cpf.replace(/[^\d]/g, '');
            // realizar a formatação...
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
        if (params.value.length === 14) {

            let cpf = params.value;
            // retira os caracteres indesejados...
            cpf = cpf.replace(/[^\d]/g, '');
            // realizar a formatação...
            return cpf.replace(/(\d{2})(\d{6})(\d{4})(\d{2})/, '$1.$2/$3-$4');
        }
        
    }

    static CpfCnpjFormatter(value) {

        if (value === null || value === undefined)
            return value;

        if (value.length === 11) {

            // retira os caracteres indesejados...
            let cpf = value.replace(/[^\d]/g, '');
            // realizar a formatação...
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
        if (value.length === 14) {

            // retira os caracteres indesejados...
            let cpf = value.replace(/[^\d]/g, '');
            // realizar a formatação...
            return cpf.replace(/(\d{2})(\d{6})(\d{4})(\d{2})/, '$1.$2/$3-$4');
        }

    }

    static DateFormatter(value) {
        // 2005-03-10T10:07:06.000Z
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.000Z$/.test(value)) {
            console.log('valor original', value);
            const datePart = value.split('T')[0];
            console.log('date part', datePart);
            const timePart = value.split('T')[1];
            console.log('time part', timePart);
            const dateArray = datePart.split('-');
            const timeArray = timePart.split(':');

            return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]} ${timeArray[0]}:${timeArray[1]}`;
        }           
        
        return value;
    }

    static DateParser(value) {
        
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
            
            const dateArray = value.split('/');            
            return new Date(dateArray[2], parseInt(dateArray[1]) - 1, dateArray[0]);
        }

        if (/^\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{1,2}$/.test(value)) {
            const dateTemp = value.split(' ')[0];
            const hourTemp = value.split(' ')[1];
            const dateArray = dateTemp.split('/');
            const timeArray = hourTemp.split(':');

            return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]} ${timeArray[0]}:${timeArray[1]}:00`;
        }

        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.000Z$/.test(value)) {
            console.log('date parser');
            console.log('valor original', value);
            const datePart = value.split('T')[0];
            console.log('date part', datePart);
            const timePart = value.split('T')[1];
            console.log('time part', timePart);
            const dateArray = datePart.split('-');
            const timeArray = timePart.split(':');

            const dataFormatada = `${dateArray[0]}/${dateArray[1]}/${dateArray[2]} ${timeArray[0]}:${timeArray[1]}:00`;
            console.log('valor retornar', dataFormatada);
            return dataFormatada;
        }

        return value;
    }
    
}