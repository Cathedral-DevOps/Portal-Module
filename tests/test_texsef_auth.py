import unittest

from app import app


class TexsefAuthTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    def test_authenticated_dashboard_route_renders_without_error(self):
        with self.client.session_transaction() as sess:
            sess["user"] = {"uid": "test-user", "email": "test@example.com", "name": "Test User"}

        response = self.client.get("/texdash/account")

        self.assertEqual(response.status_code, 200)
        self.assertIn("account", response.get_data(as_text=True).lower())


if __name__ == "__main__":
    unittest.main()
