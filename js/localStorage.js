var key = "key";

localforage.setDriver([
	localforage.INDEXEDDB,
	localforage.WEBSQL,
	localforage.LOCALSTORAGE
]).then(function () {
	localforage.getItem("key", function (err, data) {
		console.log("Initial data: "+data);

		if (data === null) {

			data = {
				"Q1": {
					"Task 1": {
						"date": "tommorrow"
					},
					"Task2": {
						"date": "today"
					}
				},
				"Q2": {
					"Task 1": {
						"date": "tommorrow"
					},
					"Task2": {
						"date": "today"
					}
				},
				"Q3": {
					"Task 1": {
						"date": "tommorrow"
					},
					"Task2": {
						"date": "today"
					}
				},
				"Q4": {
					"Task 1": {
						"date": "tommorrow"
					},
					"Task2": {
						"date": "today"
					}
				}
			};

			localforage.setItem("key", data, function () {
				console.log('Using: ' + localforage.driver());
				console.log('Saved: ' + data);
				localforage.getItem("key", fetch(data))
			});
		} else {
			fetch(data);
		}
	});
});