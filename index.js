(function () {

    let el1 = new LinkedElement();
    let el2 = new LinkedElement();
    let el3 = new LinkedElement();
    let el4 = new LinkedElement();
    let el5 = new LinkedElement();

    el1.setNext(el2);
    el2.setNext(el3);
    el3.setNext(el4);
    el4.setNext(null);

    el1.setPrev(null);
    el2.setPrev(el1);
    el3.setPrev(el2);
    el4.setPrev(el3);

    el1.setValue('Alex');
    el2.setValue('Bob');
    el3.setValue('Bruce');
    el4.setValue('John');
    el5.setValue('Oliver');

    function LinkedElement() {
        let $this = this;

        $this.setNext = function (el) {
            let nextElement = $this.getNext();

            if (nextElement !== undefined) {
                el === null ? nextElement.next = null : nextElement.next = el.next;
                nextElement.prev = el;
                el.next = nextElement;
            }

            if (el !== null) {
                el.prev = $this;
            }

            el === null ? $this.next = null : $this.next = el;
        };

        $this.setPrev = function (el) {
            let prevElement = $this.getPrev();

            if (prevElement !== undefined) {
                prevElement.next = el;
                el === null ? prevElement.prev = null : prevElement.prev = el.prev;
                el.prev = prevElement;
            }

            if (el !== null) {
                el.next = $this;
            }

            el === null ? $this.prev = null : $this.prev = el;
        };

        $this.getNext = function () {
            return $this.next;
        };

        $this.getPrev = function () {
            return $this.prev;
        };

        $this.swap = function (el) {
            let firstSwappedElementNext = $this.getNext();
            let firstSwappedElementPrev = $this.getPrev();
            let secondSwappedElementNext = el.getNext();
            let secondSwappedElementPrev = el.getPrev();

            if (firstSwappedElementNext === el) {
                $this.next = firstSwappedElementNext;
                $this.prev = el;
                el.next = $this;
                el.prev = firstSwappedElementPrev;
            } else if (firstSwappedElementNext === secondSwappedElementPrev) {
                changeRelations(
                    $this,
                    el,
                    firstSwappedElementNext,
                    firstSwappedElementPrev,
                    secondSwappedElementNext,
                    secondSwappedElementPrev
                );

                firstSwappedElementNext.next = $this;
                firstSwappedElementNext.prev = el;
            } else if (firstSwappedElementPrev === secondSwappedElementNext) {
                changeRelations(
                    $this,
                    el,
                    firstSwappedElementNext,
                    firstSwappedElementPrev,
                    secondSwappedElementNext,
                    secondSwappedElementPrev
                );

                firstSwappedElementPrev.next = el;
                firstSwappedElementPrev.prev = $this;
            } else {
                changeRelations(
                    $this,
                    el,
                    firstSwappedElementNext,
                    firstSwappedElementPrev,
                    secondSwappedElementNext,
                    secondSwappedElementPrev
                );

                firstSwappedElementNext.prev = el;
                firstSwappedElementPrev.next = el;
                secondSwappedElementNext.prev = $this;
                secondSwappedElementPrev.next = $this;
            }
        };

        $this.cut = function () {
            let nextElement = $this.getNext();
            let prevElement = $this.getPrev();

            if ($this.next !== null) {
                nextElement.prev = prevElement;
            }

            if ($this.prev !== null) {
                prevElement.next = nextElement;
            }

            $this.next = null;
            $this.prev = null;
        };

        $this.setValue = function (value) {
            $this.value = value;
        }
    }

    function changeRelations(firstElement, secondElement, firstNext, firstPrev, secondNext, secondPrev) {
        firstElement.next = secondNext;
        firstElement.prev = secondPrev;
        secondElement.next = firstNext;
        secondElement.prev = firstPrev;
    }

})();
