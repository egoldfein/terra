fmt:
	go fmt .

lint:
	go vet .

dev: 
	go run ./main.go

gen:
	go generate ./...