"""
Unit tests for temperature_converter.converter
Run with: pytest
"""
import pytest
from temperature_converter.converter import celsius_to_fahrenheit, fahrenheit_to_celsius


class TestCelsiusToFahrenheit:
    def test_freezing_point(self):
        assert celsius_to_fahrenheit(0) == 32.0

    def test_boiling_point(self):
        assert celsius_to_fahrenheit(100) == 212.0

    def test_body_temperature(self):
        assert round(celsius_to_fahrenheit(37), 1) == 98.6

    def test_negative_celsius(self):
        assert celsius_to_fahrenheit(-40) == -40.0

    def test_absolute_zero(self):
        assert round(celsius_to_fahrenheit(-273.15), 2) == -459.67

    def test_numeric_string_input(self):
        assert celsius_to_fahrenheit("25") == 77.0

    def test_integer_returns_float(self):
        assert isinstance(celsius_to_fahrenheit(0), float)

    def test_invalid_string_raises_type_error(self):
        with pytest.raises(TypeError):
            celsius_to_fahrenheit("abc")

    def test_none_raises_type_error(self):
        with pytest.raises(TypeError):
            celsius_to_fahrenheit(None)

    def test_below_absolute_zero_raises_value_error(self):
        with pytest.raises(ValueError):
            celsius_to_fahrenheit(-300)


class TestFahrenheitToCelsius:
    def test_freezing_point(self):
        assert fahrenheit_to_celsius(32) == 0.0

    def test_boiling_point(self):
        assert fahrenheit_to_celsius(212) == 100.0

    def test_body_temperature(self):
        assert round(fahrenheit_to_celsius(98.6), 1) == 37.0

    def test_crossover_point(self):
        assert fahrenheit_to_celsius(-40) == -40.0

    def test_absolute_zero(self):
        assert round(fahrenheit_to_celsius(-459.67), 2) == -273.15

    def test_numeric_string_input(self):
        assert fahrenheit_to_celsius("77") == 25.0

    def test_integer_returns_float(self):
        assert isinstance(fahrenheit_to_celsius(32), float)

    def test_invalid_string_raises_type_error(self):
        with pytest.raises(TypeError):
            fahrenheit_to_celsius("hot")

    def test_none_raises_type_error(self):
        with pytest.raises(TypeError):
            fahrenheit_to_celsius(None)

    def test_below_absolute_zero_raises_value_error(self):
        with pytest.raises(ValueError):
            fahrenheit_to_celsius(-500)


class TestRoundtrip:
    @pytest.mark.parametrize("c", [-273.15, -40, 0, 20, 37, 100])
    def test_c_to_f_to_c(self, c):
        assert round(fahrenheit_to_celsius(celsius_to_fahrenheit(c)), 8) == round(c, 8)

    @pytest.mark.parametrize("f", [-459.67, -40, 32, 68, 98.6, 212])
    def test_f_to_c_to_f(self, f):
        assert round(celsius_to_fahrenheit(fahrenheit_to_celsius(f)), 8) == round(f, 8)
