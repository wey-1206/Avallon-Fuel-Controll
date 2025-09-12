$(document).ready(function () {
    const sectionData = {
        teste_de_rodagem: {
            title: 'Teste de Rodagem',
            icon: 'bi-car-front',
            color: 'primary',
            description: 'Histórico de Notas e Canhotos fornecidos pelo setor Teste de Rodagem',
            tableData: [
                { canhoto: '3001', data: '02/08/2025', placa: 'ABC-1234', tipo: 'Gasolina', valor: "R$ 30,00", motorista: 'Thiago', nf: 'ENTREGUE', obs: 'Abastecimento rápido' },
                { canhoto: '3002', data: '04/08/2025', placa: '23456', tipo: 'Diesel', valor: "R$ 30,00", motorista: 'Douglas', nf: 'PENDENTE', obs: 'NF aguardando conferência' },
                { canhoto: '3003', data: '05/08/2025', placa: 'DEF-5678', tipo: 'Álcool', valor: "R$ 100,00", motorista: 'Leandro', nf: 'DIVERGENTE', obs: 'Diferença no valor' }
            ]
        },
        assistencia: {
            title: 'Assistência',
            icon: 'bi-wrench',
            color: 'success',
            description: 'Histórico de Notas e Canhotos fornecidos pelo setor Assistência',
            tableData: [
                { canhoto: '4001', data: '03/08/2025', placa: 'XYZ-5678', tipo: 'Serviço',valor: "R$ 100,00", motorista: 'Carlos', nf: 'ENTREGUE', obs: 'Manutenção preventiva' },
                { canhoto: '4002', data: '06/08/2025', placa: 'STU-9012', tipo: 'Reparo',valor: "R$ 170,00", motorista: 'Ana', nf: 'PENDENTE', obs: 'Aguardando peça' }
            ]
        },
        checklist: {
            title: 'Checklist de Entrada',
            icon: 'bi-clipboard2-check-fill',
            color: 'warning',
            description: 'Histórico de Notas e Canhotos fornecidos pelo setor Checklist de Entrada',
            tableData: [
                { canhoto: '5001', data: '04/08/2025', placa: 'LMN-1234', tipo: 'Inspeção',valor: "R$ 50,00", motorista: 'João', nf: 'DIVERGENTE', obs: 'Item pendente' },
                { canhoto: '5002', data: '07/08/2025', placa: 'VWX-3456', tipo: 'Verificação', valor: "R$ 30,00", motorista: 'Mariana', nf: 'ENTREGUE', obs: 'Tudo ok' }
            ]
        },
        consumo: {
            title: 'Consumo',
            icon: 'bi-speedometer',
            color: 'info',
            description: 'Histórico de Consumo',
            tableData: [
                { canhoto: '6001', data: '05/08/2025', placa: 'PQR-5678', tipo: 'Gasolina',valor: "R$ 110,00", motorista: 'Maria', nf: 'ENTREGUE', obs: 'Consumo monitorado' },
                { canhoto: '6002', data: '08/08/2025', placa: 'YZA-7890', tipo: 'Diesel', valor: "R$ 120,00", motorista: 'Pedro', nf: 'PENDENTE', obs: 'Aguardando conferência' }
            ]
        }
    };

    let currentSection = null;

    const tableTemplate = `
        <thead class="">
            <tr>
                <th>Canhoto</th>
                <th>Data</th>
                <th>Placa/OS</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Motorista</th>
                <th>NF</th>
                <th>Obs.</th>
            </tr>
        </thead>
        <tbody id="collapse_table_body"></tbody>
    `;

    function renderTableRows(rows) {
        if (!rows || !Array.isArray(rows) || rows.length === 0) {
            return `<tr><td colspan="8" class="text-center">Nenhum dado disponível</td></tr>`;
        }

        return rows.map(row => {
            const nfClass = row.nf === 'ENTREGUE' ? 'badge-success' : row.nf === 'PENDENTE' ? 'badge-danger' : 'badge-warning';
            return `
                <tr>
                    <td>${row.canhoto || ''}</td>
                    <td>${row.data || ''}</td>
                    <td>${row.placa || ''}</td>
                    <td>${row.tipo || ''}</td>
                    <td>${row.valor || ''}</td>
                    <td>${row.motorista || ''}</td>
                    <td><span class="badge ${nfClass} form-control">${row.nf || ''}</span></td>
                    <td>${row.obs || ''}</td>
                </tr>
            `;
        }).join('');
    }

    function destroyDataTable() {
        if ($.fn.DataTable && $.fn.DataTable.isDataTable('#dataTable')) {
            $('#dataTable').DataTable().clear().destroy();
            $('#dataTable_wrapper').remove();
        }
    }

    function initDataTable() {
        if ($.fn.DataTable) {
            $('#dataTable').DataTable({
                destroy: true,
                retrieve: true,
                responsive: true,

                autoWidth: false,
                columnDefs: [
                    { width: '10%', targets: 0 },
                    { width: '13%', targets: 1 },
                    { width: '12%', targets: 2 },
                    { width: '10%', targets: 3 },
                    { width: '9%', targets: 4 },
                    { width: '12%', targets: 5 },
                    { width: '10%', targets: 6 },
                    { width: '', targets: 7 }
                ],



                language: {
                    emptyTable: "Nenhum dado disponível na tabela",
                    info: "Mostrando _START_ até _END_ de _TOTAL_ registros",
                    infoEmpty: "Mostrando 0 até 0 de 0 registros",
                    lengthMenu: "Mostrar _MENU_ registros",
                    search: "Pesquisar:",
                    paginate: { first: "Primeiro", last: "Último", next: "Próximo", previous: "Anterior" }
                }
            });
        }
    }

    function updateCollapseContent(section) {
        const data = sectionData[section];
        if (!data) return console.error(`Seção ${section} não encontrada.`);

        $('#collapse_title_text').text(data.title);
        $('#collapse_icon').attr('class', `${data.icon} fs-2 mr-2 text-${data.color}`);
        $('#collapse_description').text(data.description);
        $('#collapse_table_title').attr('class', `m-0 font-weight-bold text-${data.color}`).text(data.title);
        $('#collapse_card').attr('class', `card card-body shadow border-left-${data.color}`);
        $('#novo_registro').attr('class', `btn btn-outline-${data.color} plus`).attr('id', `novo_${section}`);

        destroyDataTable();
        $('#dataTable').html(tableTemplate);
        $('#collapse_table_body').html(renderTableRows(data.tableData));
        initDataTable();
    }

    $('.card-collapse-toggle').on('click', function (e) {
        const section = $(this).data('section');
        const isOpen = $('#shared_collapse').hasClass('show');

        if (isOpen && section === currentSection) {
            $('#shared_collapse').collapse('hide');
            currentSection = null;
        } else {
            $('#shared_collapse').collapse('show');
            updateCollapseContent(section);
            currentSection = section;
        }

        e.stopPropagation();
    });

    $('#shared_collapse').on('hidden.bs.collapse', function () {
        currentSection = null;
        destroyDataTable();
        $('#dataTable').html(tableTemplate);
    });

    // Inicializa collapse fechado
    $('#shared_collapse').collapse('hide');
});
