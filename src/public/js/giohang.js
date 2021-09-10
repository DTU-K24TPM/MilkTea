


function calculateTotal() {
    let cartTotal = 0;
    $('.tr-item .total').each(function () {
        var $this = $(this);
        cartTotal += Number($this.text()) || 0;
    });
    $('.js-cart-total-amount').html(cartTotal);
}
$('input.input-qty').each(function () {
    var $this = $(this),
        qty = $this.parent().find('.is-form'),
        min = Number($this.attr('min')),
        max = Number($this.attr('max')),
        amount = $this.closest('.tr-item').find('.amount'),
        total = $this.closest('.tr-item').find('.total');
    d = Number($this.val()) || min || 0;
    total.html(Number(amount?.text() || 0) * d);
    $(qty).on('click', function () {
        if ($(this).hasClass('minus')) {
            if (d > min) d += -1
        } else if ($(this).hasClass('plus')) {
            var x = Number($this.val()) + 1
            if (x <= max) d += 1
        }
        total.html(Number(amount?.text() || 0) * d);
        $this.attr('value', d).val(d)
        calculateTotal();
    });
});
calculateTotal();
