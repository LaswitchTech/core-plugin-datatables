builder.add('components','datatable', class extends builder.ComponentClass {

    #buttons = {
        columnsVisibility:{
            label:{
                extend: 'colvis',
                text: '<i class="bi-layout-sidebar-inset"></i><span class="ms-2 d-xxl-inline d-none">Columns</span>',
            },
            icon:{
                extend: 'colvis',
                text: '<i class="bi-layout-sidebar-inset"></i>',
            },
        },
        selectTools:{
            label:{
                extend: 'collection',
                text: '<i class="bi-check2-square"></i><span class="ms-2 d-xl-inline d-none">Select</span>',
                buttons: [
                    {
                        extend: 'selectAll',
                        text: '<i class="bi-check2-all me-2"></i>All',
                    },
                    {
                        extend: 'selectNone',
                        text: '<i class="bi-x-square me-2"></i>None',
                    },
                    {
                        name: 'selectFiltered',
                        text: '<i class="bi-eye me-2"></i>Filtered',
                        action: function (e, dt, node, config) {
                            dt.rows({ selected: true }).deselect();
                            dt.rows({ search: 'applied', page: 'all' }).select();
                        },
                    },
                    {
                        name: 'selectUnfiltered',
                        text: '<i class="bi-eye-slash me-2"></i>Unfiltered',
                        action: function (e, dt, node, config) {
                            dt.rows({ selected: true }).deselect();
                            dt.rows({ search: 'removed', page: 'all' }).select();
                        },
                    },
                ],
            },
            icon:{
                extend: 'collection',
                text: '<i class="bi-check2-square"></i>',
                buttons: [
                    {
                        extend: 'selectAll',
                        text: '<i class="bi-check2-all me-2"></i>All',
                    },
                    {
                        extend: 'selectNone',
                        text: '<i class="bi-x-square me-2"></i>None',
                    },
                    {
                        name: 'selectFiltered',
                        text: '<i class="bi-eye me-2"></i>Filtered',
                        action: function (e, dt, node, config) {
                            dt.rows({ selected: true }).deselect();
                            dt.rows({ search: 'applied', page: 'all' }).select();
                        },
                    },
                    {
                        name: 'selectUnfiltered',
                        text: '<i class="bi-eye-slash me-2"></i>Unfiltered',
                        action: function (e, dt, node, config) {
                            dt.rows({ selected: true }).deselect();
                            dt.rows({ search: 'removed', page: 'all' }).select();
                        },
                    },
                ],
            },
        },
        advancedSearch:{
            label:{
                extend: 'collection',
                text: '<i class="bi-search"></i><span class="ms-2 d-xxl-inline d-none">Advanced Search</span>',
                init: function (dt, node){ $(node).removeClass('dropdown-toggle'); },
                action:function(e, dt, node, config){
                    const SearchBuilder = new bootstrap.Collapse(node.closest('div.dataTables_wrapper').find('#SearchBuilder.collapse'))
                    SearchBuilder.toggle()
                },
            },
            icon:{
                extend: 'collection',
                text: '<i class="bi-search"></i>',
                init: function (dt, node){ $(node).removeClass('dropdown-toggle'); },
                action:function(e, dt, node, config){
                    const SearchBuilder = new bootstrap.Collapse(node.closest('div.dataTables_wrapper').find('#SearchBuilder.collapse'))
                    SearchBuilder.toggle()
                },
            },
        },
        exportTools:{
            label:{
                extend: 'collection',
                text: '<i class="bi-arrow-bar-down"></i><span class="ms-2 d-xl-inline d-none">Export</span>',
                buttons: [
                    {
                        extend: 'copy',
                        text: '<i class="bi-clipboard me-2"></i>Clipboard',
                        exportOptions: {
                            columns: ':visible:not(:last-child)',
                        },
                    },
                    {
                        extend: 'excel',
                        text: '<i class="bi-filetype-xlsx me-2"></i>Excel',
                        exportOptions: {
                            columns: ':visible:not(:last-child)',
                        },
                    },
                    {
                        extend: 'csv',
                        text: '<i class="bi-filetype-csv me-2"></i>CSV',
                        exportOptions: {
                            columns: ':visible:not(:last-child)',
                        },
                    },
                    {
                        extend: 'pdf',
                        text: '<i class="bi-filetype-pdf me-2"></i>PDF',
                        exportOptions: {
                            columns: ':visible:not(:last-child)',
                        },
                    },
                ],
            },
            icon:{
                extend: 'collection',
                text: '<i class="bi-arrow-bar-down"></i>',
                buttons: [
                    {
                        extend: 'copy',
                        text: '<i class="bi-clipboard me-2"></i>Clipboard',
                        exportOptions: {
                            columns: ':visible:not(:last-child)',
                        },
                    },
                    {
                        extend: 'excel',
                        text: '<i class="bi-filetype-xlsx me-2"></i>Excel',
                        exportOptions: {
                            columns: ':visible:not(:last-child)',
                        },
                    },
                    {
                        extend: 'csv',
                        text: '<i class="bi-filetype-csv me-2"></i>CSV',
                        exportOptions: {
                            columns: ':visible:not(:last-child)',
                        },
                    },
                    {
                        extend: 'pdf',
                        text: '<i class="bi-filetype-pdf me-2"></i>PDF',
                        exportOptions: {
                            columns: ':visible:not(:last-child)',
                        },
                    },
                ],
            },
        }
    }
    _datatable = null
    #stateWriteEnabled = false;

    _init(){
        this._properties = {
            class: {
                component: null,
                buttons: null,
                searchBuilder: null,
                table: null,
                footer: null,
            },
            primary: 'id',
            card:false,
            autoSave: false,
            standardSearch:false,
            advancedSearch:true,
            exportTools:true,
            columnsVisibility:true,
            selectTools:false,
            showButtons:true,
            showButtonsLabel:true,
            pagination:true,
            information:true,
            lengthMenu:true,
            buttons: [],
            columnDefs: [],
            actions:null,
            dblclick: null,
            title: null,
            icon: null,
            datatable: {
                responsive: {
                    breakpoints: [
                        { name: 'xl', width: Infinity },
                        { name: 'lg', width: 1400 },
                        { name: 'md', width: 992 },
                        { name: 'sm', width: 768 },
                        { name: 'xs', width: 576 },
                        { name: 'xxs', width: 0 }
                    ]
                },
                autoWidth: true,
                lengthChange: true,
                ordering: true,
                paging: true,
                searching: true,
                // dom: '<"d-flex flex-column justify-content-start align-items-start mb-2"B<"#SearchBuilder.collapse w-100 py-2 pt-3"<"card card-body"Q>><"#SearchPanes.collapse py-2 pt-3"<"card card-body"P>>><t><"d-flex justify-content-between align-items-center"lip>',
                lengthMenu: [ 10, 25, 50, 100 ],
                order: [[0, 'asc']],
                pageLength: 10,
                pagingType: 'simple_numbers',
                renderer: 'bootstrap',
                columnDefs: [],
                initComplete: function(settings, json) {},
                createdRow: function (row, data, index) {},
                language:{
                    "decimal":        "",
                    "emptyTable":     "No data available in table",
                    "info":           "_START_ to _END_ of _TOTAL_",
                    "infoEmpty":      "0 to 0 of 0",
                    "infoFiltered":   "(filtered)",
                    "infoPostFix":    "",
                    "thousands":      ",",
                    "lengthMenu":     "_MENU_",
                    "loadingRecords": "Loading...",
                    "processing":     "",
                    "search":         "Search:",
                    "zeroRecords":    "No matching records found",
                    "paginate": {
                        "first":      "First",
                        "last":       "Last",
                        "next":       "Next",
                        "previous":   "Previous"
                    },
                    "aria": {
                        "sortAscending":  ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    },
                    "searchBuilder": {
                        "add": "Add Condition",
                        "button": {
                            0: "Search Builder",
                            "_": "Search Builder (%d)",
                        },
                        "clearAll": "Clear All",
                        "condition": "Condition",
                        "conditions": {
                            "array": {
                                "contains": "Contains",
                                "empty": "Empty",
                                "equals": "Equals",
                                "not": "Not",
                                "notEmpty": "Not Empty",
                                "without": "Without"
                            },
                            "date": {
                                "after": "After",
                                "before": "Before",
                                "between": "Between",
                                "empty": "Empty",
                                "equals": "Equals",
                                "not": "Not",
                                "notBetween": "Not Between",
                                "notEmpty": "Not Empty"
                            },
                            "number": {
                                "between": "Between",
                                "empty": "Empty",
                                "equals": "Equals",
                                "gt": "Greater Than",
                                "gte": "Greater Than Equal To",
                                "lt": "Less Than",
                                "lte": "Less Than Equal To",
                                "not": "Not",
                                "notBetween": "Not Between",
                                "notEmpty": "Not Empty",
                            },
                            "string": {
                                "contains": "Contains",
                                "empty": "Empty",
                                "endsWith": "Ends With",
                                "equals": "Equals",
                                "not": "Not",
                                "notContains": "Does Not Contain",
                                "notEmpty": "Not Empty",
                                "notEndsWith": "Does Not End With",
                                "notStartsWith": "Does Not Start With",
                                "startsWith": "Starts With",
                            },
                        },
                        "data": "Data",
                        "delete": "&times",
                        "deleteTitle": "Delete filtering rule",
                        "left": "<",
                        "leftTitle": "Outdent criteria",
                        "logicAnd": "And",
                        "logicOr": "Or",
                        "right": ">",
                        "rightTitle": "Indent criteria",
                        "title": {
                            0: "",
                            "_": "",
                        },
                        "value": "Value",
                        "valueJoiner": "and",
                    },
                },
                colReorder: false,
                fixedColumns: false,
                select: false,
                buttons: [],
                responsive: true,
            },
        };
    }

    _create(){

        // Set Self
        const self = this;

        // Create Component
        this._component = $(document.createElement('div')).attr({
            'id': 'datatable' + this._id,
            'class': '',
        });
        this._component.id = this._component.attr('id');

        // Create Table
        this._component.table = $(document.createElement('table')).addClass('table table-striped table-hover m-0 w-100 user-select-none').attr('style','margin-top: 0px!important;margin-bottom: 0px!important;').appendTo(this._component);

        // Create Dropdown
        if(self._properties.actions && typeof self._properties.actions === 'object'){
            if(Object.entries(self._properties.actions).length > 0){
                this._component.actions = this._builder.Component(
                    'dropdown',
                    {
                        icon: "three-dots-vertical",
                        class: {
                            object: "dropstart",
                            button: "p-0 px-2",
                        },
                    },
                    function(dropdown){
                        dropdown._component.addClass('actions');
                        if(self._properties.actions){
                            for(const [name, action] of Object.entries(self._properties.actions)){
                                dropdown.item(
                                    action,
                                    function(item){
                                        item.btn.attr('data-action',name);
                                    }
                                );
                            }
                        }
                    },
                );
            }
        }

        // Set Component Class
        if(this._properties.class.component){
            this._component.addClass(this._properties.class.component);
        }
    }

    #button(name,label = false){

        // Set Self
        const self = this;

        // Set Key
        let key = 'icon';

        // Check if label is true
        if(label){
            key = 'label';
        }

        // Check if Button Exists
        if(typeof this.#buttons[name] === "undefined"){
            return null;
        }

        // Check if Button and Label exist
        if(typeof this.#buttons[name][key] === "undefined"){
            return null;
        }

        // Return Button
        return this.#buttons[name][key];
    }

    #stateKey() {
        // include origin, path and query so /page?a=1 and /page?a=2 don't clash
        const url = location.origin + location.pathname + location.search;
        return `dt.state::${url}::${this._component.id}`;
    }

    clearState() {
        // Remove persisted state
        localStorage.removeItem(this.#stateKey());
        if (this._datatable) {
            // If DT tries to save during this block, block it
            const prev = this.#stateWriteEnabled;
            this.#stateWriteEnabled = false;

            // Clear DT’s internal state ref too
            this._datatable.state.clear();

            // Reset UI pieces to initial config
            // length
            this._datatable.page.len(this._properties.datatable.pageLength);

            // order
            this._datatable.order(this._properties.datatable.order);

            // global search
            this._datatable.search('');

            // SearchBuilder (if present)
            if (this._datatable.searchBuilder && this._datatable.searchBuilder.clearAll) {
                this._datatable.searchBuilder.clearAll();
            }

            // Columns: default back to visible, then reapply any initial columnDefs visibility you declared
            this._datatable.columns().visible(true, false); // false = no redraw yet

            if (Array.isArray(this._properties.datatable.columnDefs)) {
                this._properties.datatable.columnDefs.forEach(def => {
                    // DataTables accepts `targets` or `target`; you used `target` when adding Action column.
                    const targets = def.targets ?? def.target;
                    if (typeof def.visible !== 'undefined' && typeof targets !== 'undefined') {
                        this._datatable.columns(targets).visible(!!def.visible, false);
                    }
                });
            }

            // Adjust and draw once
            this._datatable.columns.adjust().draw(false);

            // restore previous write flag
            this.#stateWriteEnabled = prev;
        }
    }

    saveState() {
        if(this._datatable) {
            this._datatable.state.save();
        }
    }

    #addSaveButton() {
        // Honor label/icon mode using your showButtonsLabel flag
        const text = this._properties.showButtonsLabel
            ? '<i class="bi bi-save"></i><span class="ms-2 d-xl-inline d-none">Save settings</span>'
            : '<i class="bi bi-save"></i>';

        return {
            text,
            // optional: class name to target later if you want
            className: 'btn-success btn-save-settings',
            init: function (dt, node){ $(node).removeClass('btn-secondary'); },
            attr: { title: 'Save current view (order, columns, length, filters)' },
            action: (e, dt) => {
                const prev = this.#stateWriteEnabled;
                this.#stateWriteEnabled = true;  // allow a one-shot write
                dt.state.save();
                this.#stateWriteEnabled = prev;  // revert
            },
        };
    }

    #addClearButton() {
        // Honor label/icon mode using your showButtonsLabel flag
        const text = this._properties.showButtonsLabel
            ? '<i class="bi bi-x-circle"></i><span class="ms-2 d-xl-inline d-none">Clear settings</span>'
            : '<i class="bi bi-x-circle"></i>';

        return {
            text,
            // optional: class name to target later if you want
            className: 'btn-light btn-clear-settings',
            init: function (dt, node){ $(node).removeClass('btn-secondary'); },
            attr: { title: 'Clear current view (order, columns, length, filters)' },
            action: (e, dt) => {
                this.clearState();
            },
        };
    }

    #configure(){

        // Set Self
        const self = this;

        // Add Action column
        if(typeof this._component.actions === 'object' && Object.entries(this._properties.actions).length > 0){
            this._properties.datatable.columnDefs.push(
                {
                    target: this._properties.datatable.columnDefs.length,
                    visible: true,
                    responsivePriority: 1,
                    title: "",
                    data: null,
                    defaultContent: this._component.actions.outerHTML(),
                    render: function(data, type, row, meta) {
                        // Render the action dropdown
                        return self._component.actions.outerHTML();
                    }
                }
            );
            // this._properties.datatable.fixedColumns = {start: 0, end: 1};
            // this._properties.datatable.scrollX = true;
        }

        // Add Select Tools
        if(this._properties.selectTools){
            this._properties.datatable.select = this._properties.selectTools
            this._properties.datatable.buttons.push(self.#button('selectTools',this._properties.showButtonsLabel));
        }

        // Add Export Tools
        if(this._properties.exportTools){
            this._properties.datatable.buttons.push(self.#button('exportTools',this._properties.showButtonsLabel));
        }

        // Add Columns Visibility
        if(this._properties.columnsVisibility){
            this._properties.datatable.buttons.push(self.#button('columnsVisibility',this._properties.showButtonsLabel));
        }

        // Add Advanced Search
        if(this._properties.advancedSearch){
            this._properties.datatable.buttons.push(self.#button('advancedSearch',this._properties.showButtonsLabel));
        }

        // Setup DOM structure
        this._properties.datatable.dom = '';
        // Controls
        this._properties.datatable.dom += '<"datatables-controls';
        if(this._properties.class.buttons){
            this._properties.datatable.dom += ' ' + this._properties.class.buttons;
        } else {
            this._properties.datatable.dom += ' d-flex flex-column justify-content-start align-items-start';
        }
        this._properties.datatable.dom += '"';
        if(this._properties.standardSearch){
            this._properties.datatable.dom += 'f';
        }
        this._properties.datatable.dom += 'B';
        if(this._properties.advancedSearch){
            this._properties.datatable.dom += '<"#SearchBuilder.searchBuilder collapse w-100';
            if(this._properties.class.searchBuilder){
                this._properties.datatable.dom += ' ' + this._properties.class.searchBuilder;
            }
            this._properties.datatable.dom += '"<"card card-body"Q>>';
        }
        if(this._properties.searchPanes){
            this._properties.datatable.dom += '<"#SearchPanes.collapse py-2 pt-3';
            if(this._properties.class.searchPanes){
                this._properties.datatable.dom += ' ' + this._properties.class.searchPanes;
            }
            this._properties.datatable.dom += '"<"card card-body"P>>';
        }
        this._properties.datatable.dom += '>';
        // Table
        this._properties.datatable.dom += '<"datatables-table';
        if(this._properties.class.table){
            this._properties.datatable.dom += ' ' + this._properties.class.table;
        }
        this._properties.datatable.dom += '"t>';
        // Footer
        this._properties.datatable.dom += '"<"datatables-footer';
        if(this._properties.class.footer){
            this._properties.datatable.dom += ' ' + this._properties.class.footer;
        } else {
            this._properties.datatable.dom += 'd-flex justify-content-between align-items-center';
        }
        this._properties.datatable.dom += '"lip>';

        // Persist state (order, length, visibilities, search, SearchBuilder rules)
        this._properties.datatable.stateSave = true;
        // keep forever (until you clear localStorage)
        this._properties.datatable.stateDuration = -1;

        // Add manual "Clear settings" when autoSave is disabled
        if (!this._properties.autoSave) {
            this._properties.datatable.buttons.push(this.#addClearButton());
        }

        // Add manual "Save settings" when autoSave is disabled
        if (!this._properties.autoSave) {
            this._properties.datatable.buttons.push(this.#addSaveButton());
        }

        // Use a custom key per URL + component id
        this._properties.datatable.stateSaveCallback = (settings, data) => {
            if (!self.#stateWriteEnabled) return;
            try {
                localStorage.setItem(self.#stateKey(), JSON.stringify(data));
                self._builder.Toast.add({
                    color: 'success',
                    icon: 'save',
                    title: self._builder.Locale.get('Settings Saved'),
                    body: self._builder.Locale.get('Your table settings have been saved.'),
                });
            } catch(e) {
                // optional: fall back or warn
                console.warn('Failed to save DataTable state:', e);
            }
        };
        this._properties.datatable.stateLoadCallback = (settings) => {
            try {
                const raw = localStorage.getItem(self.#stateKey());
                return raw ? JSON.parse(raw) : null;
            } catch(e) {
                console.warn('Failed to load DataTable state:', e);
                return null;
            }
        };

        // drawCallback
        this._properties.datatable.drawCallback = function(){

            setTimeout(function() {
                // Tooltips
                $('[data-bs-toggle="tooltip"]').tooltip();

                // Timeago
                $('.timeago').timeago();
            }, 0);

            if(typeof self._datatable !== 'undefined'){

                // Double Click Event
                if(typeof self._properties.dblclick === 'function'){
                    self._component.table.find('tr').off().dblclick(
                        function(event){
                            let node = $(this);
                            let data = self._datatable.row(node).data();
                            if(typeof data === 'undefined'){
                                return;
                            }
                            self._properties.dblclick(event, self, self._datatable, node, data);
                        },
                    );
                }

                // Set Action Dropdown Background
                self._component.table.find('button.dropdown-item[data-action]').each(function(){
                    let node = $(this);
                    let ul = node.parents('ul');
                    ul.css('background-image','none');
                });

                // Action Button Events
                self._component.table.find('button.dropdown-item[data-action]').each(function(){
                    let node = $(this);
                    let li = node.parents('li');
                    let action = node.attr('data-action');
                    let row = node.parents('tr');
                    let data = self._datatable.row(row).data();
                    node.off().click(function(event){
                        if(typeof self._properties.actions[action].action === 'function'){
                            self._properties.actions[action].action(event, self, self._datatable, node, row, data);
                        }
                    })
                    if(typeof self._properties.actions[action].visible === 'function'){
                        if(!self._properties.actions[action].visible(li, self, node, row, data)){
                            li.hide();
                        } else {
                            li.show();
                        }
                    }
                    if(typeof self._properties.actions[action].visible === 'boolean'){
                        if(!self._properties.actions[action].visible){
                            li.hide();
                        } else {
                            li.show();
                        }
                    }
                });
            }
        }

        // ColumnDefs
        if (Array.isArray(this._properties.datatable.columnDefs)) {
            for(const [key, definition] of Object.entries(this._properties.datatable.columnDefs)){

                // Check if the definition has a render function
                if (typeof definition.render === 'undefined' || typeof definition.render !== 'function') {

                    // Add default render function if not defined
                    definition.render = function(data, type, row, meta) {
                        return self._builder.Render(definition.data ?? definition.name, data, row, type);
                    }
                }

                // Update the definition in the array
                this._properties.datatable.columnDefs[key] = definition;
            }
        }

        // return
        return this._properties.datatable;
    }

    _timeout(){

        // Set Self
        const self = this;

        // Initialize Datatable
        this._datatable = this._component.table.DataTable(this.#configure());

        // Auto-save only if enabled
        if (this._properties.autoSave) {
            this.#stateWriteEnabled = true;
            this._datatable.on(
                // save on common mutating events
                'column-visibility.dt column-reorder.dt order.dt length.dt search.dt',
                () => this._datatable.state.save()
            );

            // Some extensions redraw; save on draw to catch late updates (cheap op)
            this._datatable.on('draw.dt', () => this._datatable.state.save());

            // SearchBuilder specific (if it emits in your build)
            $(this._component).on('dtsb-redrawContents', () => this._datatable.state.save());
        }

        // Hide buttons if no rows are selected
        this._datatable.on('select.dt deselect.dt', () => {
            // Check if any rows are selected
            const anySelected = this._datatable.rows({ selected:true }).any();
            // Count selected rows
            const selectedCount = this._datatable.rows({ selected:true }).count();

            // Enable / disable first (optional – keeps keyboard users happy)
            this._datatable.buttons('.requires-selection').enable(anySelected);     // API method  :contentReference[oaicite:1]{index=1}

            // Then actually hide or show the buttons’ DOM elements
            $(this._datatable.buttons('.requires-selection').nodes()).toggleClass('d-none', !anySelected);  // Bootstrap’s “display:none”

            // Enable / disable first (optional – keeps keyboard users happy)
            this._datatable.buttons('.requires-selection-multiple').enable(selectedCount > 1);     // API method  :contentReference[oaicite:1]{index=1}

            // Then actually hide or show the buttons’ DOM elements
            $(this._datatable.buttons('.requires-selection-multiple').nodes()).toggleClass('d-none', !(selectedCount > 1));  // Bootstrap’s “display:none”
        });

        // Add Search
        this._builder.Search.get().on('input propertychange',function(){
            self._datatable.search($(this).val()).draw();
        });
    }

    data(selected = false){

        // Check if the caller only wants the selected rows
        if (selected) {
            return this._datatable.rows({ selected: true }).data().toArray();
        }

        // Otherwise return the full dataset
        return this._datatable.data().toArray();
    }

    add(data){

        // Set Self
        const self = this;

        if(this._datatable){

            // Check if the row already exists
            const existingRow = this._datatable.rows(function(idx, rowData) {
                return rowData[self._properties.primary] === data[self._properties.primary];
            });
            if (existingRow.data().length > 0) {
                // Row already exists, update it instead
                this._datatable.row(existingRow).data(data).draw();
                return;  // Exit early to avoid adding a duplicate row
            }

            // Add Row
            this._datatable.row.add(data).draw()
        } else {

            // Clear the interval once the table is found
            var interval = setInterval(function() {
                if(self._datatable){
                    clearInterval(interval);

                    // Check if the row already exists
                    const existingRow = self._datatable.rows(function(idx, rowData) {
                        return rowData[self._properties.primary] === data[self._properties.primary];
                    });
                    if (existingRow.data().length > 0) {
                        // Row already exists, update it instead
                        self._datatable.row(existingRow).data(data).draw();
                        return;  // Exit early to avoid adding a duplicate row
                    }

                    // Add Row
                    self._datatable.row.add(data).draw()
                }
            }, 100);
        }
    }

    update(row, data){

        // Set Self
        const self = this;

        // Update Row
        setTimeout(() => this._datatable.row(row).data(data).draw(), 0);
    }

    delete(row){

        // Set Self
        const self = this;

        // Delete Row
        setTimeout(() => this._datatable.row(row).remove().draw(), 0);
    }
})
