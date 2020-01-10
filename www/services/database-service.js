let DatabaseService = {

    db: null,

    init() {
        this.db = window.openDatabase("freeText", "1.0", "freeText", 2 * 1024 * 1024);
        this.db.transaction(
            tx => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS user (id_user unique, name, phone_number, country_code)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS conversation (id_conversation unique, title)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS message (id_message unique, id_conversation, id_user, content, timestamp, phone_number, synchronized)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS participant (id_user, id_conversation, surname)');
            }, this.errorCB
        )
    },

    errorCB(err) {
        console.log('Error processing SQL: ' + err.code);
    },

    findAllConversations() {
        return new Promise(resolve => {
            this.db.transaction(tx => {
                tx.executeSql('SELECT * FROM conversation', [],
                    (_, results) => resolve(results.rows),
                    this.errorCB);
            });
        });
    },

    findAllMessages() {
        return new Promise(resolve => {
            this.db.transaction(tx => {
                tx.executeSql('SELECT * FROM message', [],
                    (_, results) => resolve(results.rows),
                    this.errorCB);
            });
        });
    },

    findUserFromPhoneNumber(phoneNumber) {
        return new Promise(resolve => {
            this.db.transaction(tx => {
                tx.executeSql('SELECT * FROM user WHERE phone_number=?',
                    [ phoneNumber ],
                    (_, results) => resolve(results.rows),
                    this.errorCB);
            });
        });
    },

    insertSMS(sms) {
        return new Promise(resolve => {
            this.findUserFromPhoneNumber(sms.address)
                .then(results => {
                    let userId = null;
                    if (results.length > 0) {
                        userId = results.item(0).id_user;
                    }
                    this.db.transaction(tx => {
                        tx.executeSql('INSERT INTO message (id_user, content, timestamp, phone_number, synchronized) VALUES (?, ?, ?, ?, ?)',
                            [userId, sms.body, sms.date, sms.address, false],
                            _ => {
                            this.synchronize();
                            resolve(true);
                        })
                    })
                })
        });
    },

    synchronize() {
        // TODO: synchronize with API's database
    }

};
