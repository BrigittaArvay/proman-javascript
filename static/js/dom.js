// It uses data_handler.js to visualize elements
import {templates} from "./templates.js";

export let dom = {
        loadBoards: function () {
            // retrieves boards and makes showBoards called
        },
        showBoards: function (boards) {
            // shows boards appending them to #boards div
            // it adds necessary event listeners also
            for (let board of boards) {
                templates.createBoardElement(board.title, board.statuses, board.id);
                dom.showCards(board);
            }
        },
        loadCards: function (boardId) {
            // retrieves cards and makes showCards called
        },
        showCards: function (board) {
            // shows the cards of a board
            // it adds necessary event listeners also
            let cards = board.cards;
            for (let i = 0; i < cards.length; i++) {
                let column = dom.addCard(board, cards[i]);
                let cardElement = templates.createCardElement(cards[i].title, cards[i].id);
                column.appendChild(cardElement);
            }
        },
        appendToElement: function (elementToExtend, textToAppend, prepend = false) {
            // function to append new DOM elements (represented by a string) to an existing DOM element
            let fakeDiv = document.createElement('div');
            fakeDiv.innerHTML = textToAppend.trim();

            for (childNode of fakeDiv.childNodes) {
                if (prepend) {
                    elementToExtend.prependChild(childNode);
                } else {
                    elementToExtend.appendChild(childNode);
                }
            }

            return elementToExtend.lastChild;
        },
        addCard: function (board, card) {
            let column;
            if (card.status_id === 1) {
                column = document.querySelector(`.board[data-board-id='${board.id}'] .cards > :first-child`);
            }
            if (card.status_id === 2) {
                column = document.querySelector(`.board[data-board-id='${board.id}'] .cards > :nth-child(2)`);
            }
            if (card.status_id === 3) {
                column = document.querySelector(`.board[data-board-id='${board.id}'] .cards > :nth-child(3)`);
            }
            if (card.status_id === 4) {
                column = document.querySelector(`.board[data-board-id='${board.id}'] .cards > :last-child`);
            }
            return column
        },
        toggleBoard: function (event) {
            if (event.target.className !== 'new-card-button' && event.target.className !== 'board-title' &&
                event.target.className !== 'delete-board-button') {
                let boardHeader;
                if (event.target.className === 'fas fa-caret-up') {
                    boardHeader = event.target.parentElement;
                } else {
                    boardHeader = event.target;
                }
                const tableContainer = boardHeader.nextSibling;
                const table = tableContainer.querySelector('.board-data');
                const arrow = boardHeader.querySelector('.fas');
                const newCardButton = boardHeader.querySelector('.new-card-button');
                const deleteBoardButton = boardHeader.querySelector(".delete-board-button");

                const tableHeightChecked = boardHeader.dataset.heightChecked;
                const isTableOpen = boardHeader.dataset.tableIsOpen;
                const initHeight = boardHeader.dataset.initHeight;

                if (tableHeightChecked === 'false') {
                    tableContainer.style.height = `${tableContainer.offsetHeight}px`;
                    boardHeader.dataset.initHeight = `${tableContainer.offsetHeight}`;
                    boardHeader.dataset.heightChecked = 'true';
                }

                if (isTableOpen === 'true') {
                    boardHeader.dataset.tableIsOpen = 'false';
                    tableContainer.style.height = '0px';
                    arrow.style.transform = 'translate(0, 25%) rotateX(180deg)';
                    table.style.display = 'none';
                    newCardButton.style.visibility = 'hidden';
                    deleteBoardButton.style.visibility = 'hidden';

                    setTimeout( function() {
                        boardHeader.style.borderBottomLeftRadius = "10px";
                        boardHeader.style.borderBottomRightRadius = "10px";
                    }, 600);
                } else {
                    boardHeader.dataset.tableIsOpen = 'true';
                    tableContainer.style.height = `${initHeight}px`;
                    arrow.style.transform = 'rotateX(0deg)';
                    boardHeader.style.borderBottomLeftRadius = "0";
                    boardHeader.style.borderBottomRightRadius = "0";

                    setTimeout(function() {
                        table.style.display = 'table';
                        newCardButton.style.visibility = 'visible';
                        deleteBoardButton.style.visibility = 'visible';
                    }, 600);
                }
            }
        }
    };


