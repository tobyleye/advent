package main

import (
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func part1(content string) {

	lines := strings.Split(content, "\n")

	nonNumbersRegex := regexp.MustCompile(`[^\d]`)
	var total int
	for _, line := range lines {
		line := nonNumbersRegex.ReplaceAllString(line, "")

		chars := strings.Split(line, "")
		firstLastDigit := chars[0] + chars[len(chars)-1]

		firstLast, err := strconv.ParseInt(firstLastDigit, 10, 0)

		if err == nil {
			total = total + int(firstLast)
		}

	}

	fmt.Println("Total is:", total)
}

func main() {
	input, err := os.ReadFile("./01.txt")
	if err != nil {
		log.Fatal("error reading input")
	}
	content := string(input)
	content2 := strings.TrimSpace(content)

	part1(content2)
}
