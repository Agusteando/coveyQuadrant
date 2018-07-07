var key = "key";

localforage.setDriver([
	localforage.INDEXEDDB,
	localforage.WEBSQL,
	localforage.LOCALSTORAGE
]).then(function () {
	localforage.getItem("cq", function (err, data) {
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

			localforage.setItem("cq", data, function () {
				console.log('Using: ' + localforage.driver());
				console.log('Saved: ' + data);
				localforage.getItem("cq", fetch(data))
			});
		} else {
			fetch(data);
		}
	});
});