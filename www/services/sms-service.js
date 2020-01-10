let smsService = {

    init() {
        SMSReceive.startWatch(
            _ => {
                document.addEventListener('onSMSArrive', this.handleSMSArrive)
            },
            error => console.log(error));
    },

    handleSMSArrive(event) {
        // TODO
        //  -> recover contact id
        //  -> store in a local database
        //  -> update view
        //  -> send notification
        console.log(event.data);
        DatabaseService.insertSMS(event.data);

        let options = new ContactFindOptions();
        options.filter = event.data.address;
        options.desiredFields = [navigator.contacts.fieldType.phoneNumbers,
            navigator.contacts.fieldType.displayName];
        options.hasPhoneNumber = true;
        let fields = [
            navigator.contacts.fieldType.phoneNumbers
        ];
        navigator.contacts.find(fields,
            res => {
                cordova.plugins.notification.local.schedule({
                    title: res[0].displayName,
                    text: event.data.body
                });
            },
            error => console.log(error),
            options);
    }
};
